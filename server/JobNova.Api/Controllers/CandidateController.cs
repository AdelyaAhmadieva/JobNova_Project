using System.Security.Claims;
using JobNova_server.Controllers.Contracts;
using JobNova.Application.Services;
using JobNova.Core.Attributes;
using JobNova.Core.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobNova_server.Controllers;

[ApiController]
public class CandidateController : ControllerBase
{
    private readonly ICandidateService _candidateService;
    private readonly IResumeService _resumeService;

    public CandidateController(ICandidateService candidateService, IResumeService resumeService)
    {
        _candidateService = candidateService;
        _resumeService = resumeService;
    }
    
    /// <summary>
    /// Controllers 
    /// </summary>
    /// <returns></returns>
    
    [HttpGet("/candidates")]
    public async Task<ActionResult<List<CandidateResponce>>> GetAllCandidates()
    {
        List<CandidateResponce> candidates = new List<CandidateResponce>();
        var data = await _candidateService.GetAllCandidates();

        foreach (var candidate in data)
        {
            var resumes = await _resumeService.GetAllOfCandidate(candidate.Id);

            var a = resumes.Select(x => new ResumeResponce(x.Id,x.Description, x.Skills)).ToList();

            candidates.Add(new CandidateResponce(candidate.Id, candidate.FirstName, candidate.LastName,
                candidate.Email, candidate.Introduction, candidate.Phone, candidate.Website, candidate.Occupation,
                candidate.Skills, a));
        }
        return Ok(candidates);
    }
    
    [HttpGet ("/candidate")]
    public async Task<ActionResult<CandidateResponce>> GetCandidate()
    {
        try
        {
            var claims = HttpContext.User.Claims.ToList();
            Guid currentUserId = Guid.Empty;
            foreach (var c in claims)
            {
                if (c.Type == "userId")
                    currentUserId = new Guid(c.Value);
            }
            
            var candidate = await _candidateService.GetById(currentUserId);
            
            var resumes = await _resumeService.GetAllOfCandidate(candidate.Id);

            var resumeResponces = resumes.Select(x => new ResumeResponce(x.Id,x.Description, x.Skills)).ToList();

            
            return (Ok(new CandidateResponce(
                 candidate.Id,
                 candidate.FirstName,
                 candidate.LastName,
                 candidate.Email,
                 candidate.Introduction,
                 candidate.Phone,
                 candidate.Website,
                 candidate.Occupation,
                 candidate.Skills,
                 resumeResponces
                )));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message );
        }
        
    }
    
    [HttpGet ("/getCandidateInformation")]
    public async Task<ActionResult<CandidateResponce>> GetCandidateInfo([FromQuery] string id)
    {
        try
        {

            var currentUserId = new Guid(id);
            var candidate = await _candidateService.GetById(currentUserId);
            
            var resumes = await _resumeService.GetAllOfCandidate(candidate.Id);

            var resumeResponces = resumes.Select(x => new ResumeResponce(x.Id,x.Description, x.Skills)).ToList();

            return (Ok(new CandidateResponce(
                candidate.Id,
                candidate.FirstName,
                candidate.LastName,
                candidate.Email,
                candidate.Introduction,
                candidate.Phone,
                candidate.Website,
                candidate.Occupation,
                candidate.Skills,
                resumeResponces
            )));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message );
        }
        
    }

    [HttpDelete("/candidates")]
    public async Task<ActionResult<string>> DeleteCandidate([FromBody] string id)
    {
        var candidateId = new Guid(id);
        await _candidateService.DeleteCandidate(candidateId);
        return Ok("okey");
    }

    [HttpPost ("/candidates")]
    public async Task<ActionResult<string>> CreateCandidate([FromBody] CandidateRequest request, string role)
    {
        var newCandidate = Candidate.Create(
            Guid.NewGuid(), request.FirstName, request.LastName, request.Email, role, request.Password, 
            null, null, null, null, new List<string>());

        if (newCandidate.Item1 == string.Empty)
        {
            await _candidateService.CreateCandidate(newCandidate.Item2);
            return Ok("Created");
        }

        return BadRequest(newCandidate.Item1);
    }

    [HttpPatch("/updateCandidateInfo")]
    public async Task<ActionResult<string>> UpdateCandidate([FromBody] UpdateCandidateRequest request)
    {
        var claims = HttpContext.User.Claims.ToList();
        
        List<string> skills = new List<string>();
        foreach (var skill in request.Skills)
        {
            skills.Add(skill);
        }

        

        Guid currentUserId = Guid.Empty;
        foreach (var c in claims)
        {
            if (c.Type == "userId")
                currentUserId = new Guid(c.Value);
        }
        
        var candidate = await _candidateService.GetById(currentUserId);
        await _candidateService.UpdateCandidate(candidate.Id, new Candidate(
            candidate.Id, request.FirstName, request.LastName, candidate.Email, candidate.Role, candidate.PasswordHash,
            request.Introduction, request.Phone, request.Website, request.Occupation, skills ));
        return Ok("Candidate updated");
    }
}
 
