using System.Net.Http.Headers;
using System.Security.Claims;
using JobNova_server.Controllers.Contracts;
using JobNova_server.Controllers.Contracts.Requests.RegistrationControllerRequests;
using JobNova.Application.Services;
using JobNova.Core.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace JobNova_server.Controllers;

[ApiController]
public class RegistrationController : ControllerBase
{
    private readonly ICandidateService _candidateService;
    private readonly IEmployerService _employerService;

    public RegistrationController(ICandidateService candidateService, IEmployerService employerService)
    {
        _candidateService = candidateService;
        _employerService = employerService;
    }
    
    
    [HttpPost ("/register")]
    public async Task<ActionResult<string>> Registration([FromBody] RegistrationRequest request)
    {
        try
        {
            var isCandidateEmailBusy = await _candidateService.FindCandidateByEmail(request.Email);
            var isEmployerEmailBusy = await _candidateService.FindCandidateByEmail(request.Email);
            if (isEmployerEmailBusy || isCandidateEmailBusy)
                return BadRequest("Email is busy");

            if (request.Role == "Candidate")
            {
                var candidateToCreate = Candidate.Create(
                    Guid.NewGuid(), request.FirstName, request.LastName,  request.Email, request.Role, request.Password,
                    null, null, null, null, new List<string>());
        
                if (candidateToCreate.Item1 != string.Empty)
                    return BadRequest("Wrong data");
        
                return Ok(await _candidateService.Registration(candidateToCreate.Item2));
            }
            if (request.Role == "Employer")
            {
                var employerToCreate = Employer.Create(
                    Guid.NewGuid(), request.FirstName, request.Email, request.Role, request.Password, 
                    null, null, null, null, null, null, null );
        
                if (employerToCreate.Item1 != string.Empty)
                    return BadRequest("Wrong data");
        
                return Ok(await _employerService.Registration(employerToCreate.Item2));
            }

            return BadRequest("Wrong Role. Not Candidate or Employer");

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }
    
    [HttpPost ("/login")]
    public async Task<ActionResult<string>> LogIn([FromBody] LoginRequest request)
    {
        ///
        /// Место для валидации
        /// 
        try
        {
            var isSuchCandidate = await _candidateService.FindCandidateByEmail(request.Email);
            var isSuchEmployer = await _employerService.FindEmployerByEmail(request.Email);
            if (!isSuchCandidate && !isSuchEmployer)
            {
                return BadRequest("User with such Email not found");
            }

            if (isSuchCandidate)
            {
                Candidate candidateInBase = await _candidateService.GetCandidateByEmail(request.Email);
                var logIn = await _candidateService.LogIn(request.Password, candidateInBase);
            
                Claim[] claims =
                {
                    new Claim(candidateInBase.Role, "true"),
                    new Claim("userId", candidateInBase.Id.ToString())
                };
                HttpContext.User.Claims.Append(new Claim(candidateInBase.Role, "true"));
                HttpContext.User.Claims.Append(new Claim("userId", candidateInBase.Id.ToString()));
                return Ok(
                    new
                    {
                        token = logIn.token
                    }
                );
            }
            
            if (isSuchEmployer)
            {
                Employer employerInBase = await _employerService.GetEmployerByEmail(request.Email);
                var logIn = await _employerService.LogIn(request.Password, employerInBase);
            
                Claim[] claims =
                {
                    new Claim(employerInBase.Role, "true"),
                    new Claim("userId", employerInBase.Id.ToString())
                };
                HttpContext.User.Claims.Append(new Claim(employerInBase.Role, "true"));
                HttpContext.User.Claims.Append(new Claim("userId", employerInBase.Id.ToString()));
                return Ok(
                    new
                    {
                        token = logIn.token
                    }
                );
            }

            return BadRequest("No such Candidate or Employer");


        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    
    [HttpGet("/getInfo")]
    [Authorize]
    public async Task<ActionResult<string>> GetUserData()
    {
        // Work with claims
        var claims = HttpContext.User.Claims.ToList();
        Guid currentUserId = Guid.Empty;
        foreach (var c in claims)
        {
            if (c.Type == "userId")
                currentUserId = new Guid(c.Value);
        }
        
        // Check Role
        string role = string.Empty;
        foreach (var c in claims)
        {
            if (c.Type == "Employer")
                role = "Employer";
            if (c.Type == "Candidate")
                role = "Candidate";
        }
        
        // Work with data
        if (role == "Candidate")
        {
            var candidate = await _candidateService.GetById(currentUserId);
            return Ok(
                new
                {
                    Role = candidate.Role,
                    Email = candidate.Email,
                    Id = candidate.Id
                });
        }
        if (role == "Employer")
        {
            var employer = await _employerService.GetById(currentUserId);
            return Ok(
                new
                {
                    Role = employer.Role,
                    Email = employer.Email,
                    Id = employer.Id
                });
        }

        return BadRequest("Employer or Candidate not found. Check code");


    }
    
    
}