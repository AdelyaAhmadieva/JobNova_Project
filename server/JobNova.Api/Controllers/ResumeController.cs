using JobNova_server.Controllers.Contracts;
using JobNova.Application.Services;
using JobNova.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobNova_server.Controllers;

[ApiController]
public class ResumeController : ControllerBase
{
    private readonly IResumeService _resumeService;

    public ResumeController(IResumeService resumeService)
    {
        _resumeService = resumeService;
    }

    [HttpPost("candidates/{userId}/resume")]
    public async Task<ActionResult<string>> CreateResume( [FromBody] ResumeRequest request)
    {
        try
        {
            var claims = HttpContext.User.Claims.ToList();
            Guid userId = Guid.Empty;
            foreach (var c in claims)
            {
                if (c.Type == "userId")
                    userId = new Guid(c.Value);
            }
        
            var newResume = Resume
                .Create(Guid.NewGuid(), request.Description, userId, request.Skills.ToList());
            return Ok(await _resumeService.CreateResume(newResume.resume));
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        
    }

    [HttpDelete("candidates/{userId}/resume")]
    public async Task<ActionResult<string>> DeleteResume(Guid userId,[FromQuery]Guid resumeId)
    {
        try
        {
            await _resumeService.DeleteResume(resumeId);
            return Ok("Resume deleted");
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        
    }

    [HttpPatch("candidates/{userId}/resume")]
    public async Task<ActionResult<string>> UpdateResume([FromBody] ResumeRequest request, Guid userId, Guid resumeId)
    {
        await _resumeService.UpdateResume(resumeId, request.Description, request.Skills);
        return Ok("Resume Updated");
    }



}