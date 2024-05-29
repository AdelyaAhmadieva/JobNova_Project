using JobNova_server.Controllers.Contracts;
using JobNova.Application.Services;
using JobNova.Core.Attributes;
using JobNova.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobNova_server.Controllers;

[ApiController]
public class EmployerController: ControllerBase
{
    private readonly IEmployerService _employerService;
    

    public EmployerController(IEmployerService employerService)
    {
        _employerService = employerService;
      
    }
    
    [HttpGet("/employers")]
 
    public async Task<ActionResult<List<EmployerResponse>>> GetAllEmployers()
    {
        List<EmployerResponse> employers = new List<EmployerResponse>();
        var data = await _employerService.GetAllEmployers();

        foreach (var employer in data)
        {

            employers.Add(new EmployerResponse(
                employer.EmployerName,
                employer.Id.ToString(),
                employer.Founder,
                employer.FoundingDate,
                employer.Address,
                employer.NumberOfEmployees,
                employer.Website,
                employer.Story,
                employer.EmailToConnect,
                new List<Vacancy>()));

        }

        return Ok(employers);
    }
    
    [HttpPost ("/employers")]
    public async Task<ActionResult<string>> CreateEmployer([FromBody] CandidateRequest request, string role)
    {
        var newEmployer = Employer.Create(
            Guid.NewGuid(), request.FirstName, request.Email, role, request.Password, null, null,
            null, null, null, null, null);

        if (newEmployer.Item1 == string.Empty)
        {
            await _employerService.CreateEmployer(newEmployer.Item2);
            return Ok(newEmployer.Item2.Id);
        }
        return BadRequest(newEmployer.Item1);
    }

    
    
    [HttpPatch("/updateEmployerInfo")]
    public async Task<ActionResult<string>> UpdateEmployer([FromBody]EmployerResponse request)
    {
        var claims = HttpContext.User.Claims.ToList();
        Guid currentUserId = Guid.Empty;
        foreach (var c in claims)
        {
            if (c.Type == "userId")
                currentUserId = new Guid(c.Value);
        }
        
        var employer = await _employerService.GetById(currentUserId);
        
        await _employerService.UpdateEmployer(employer.Id, new Employer(
            employer.Id, request.employerName, employer.Email, employer.Role, employer.PasswordHash,
            request.founder, request.foundingData, request.address, request.numberOfEmployees,
            request.website, request.story, request.emailToConnect));
        return Ok("");
    }

    [HttpGet("/getEmployer")]
    public async Task<ActionResult<EmployerResponse>> GetEmployerInfo()
    {
        var claims = HttpContext.User.Claims.ToList();
        Guid currentUserId = Guid.Empty;
        foreach (var c in claims)
        {
            if (c.Type == "userId")
                currentUserId = new Guid(c.Value);
        }

        var employer = await _employerService.GetById(currentUserId);
        return Ok(new EmployerResponse(
            employer.EmployerName,
            employer.Email,
            employer.Founder,
            employer.FoundingDate,
            employer.Address,
            employer.NumberOfEmployees,
            employer.Website,
            employer.Story,
            employer.EmailToConnect,
            employer.Vacancies)
        );

    }
}
