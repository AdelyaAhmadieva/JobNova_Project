using JobNova_server.Controllers.Contracts;
using JobNova.Application.Services;
using JobNova.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobNova_server.Controllers;
[ApiController]
public class VacancyController : ControllerBase
{
    private readonly IVacancyService _vacancyService;
    public VacancyController(IVacancyService vacancyService)
    {
        _vacancyService = vacancyService;
    }


    [HttpPost("employers/{userId}/vacancy")]
    public async Task<ActionResult<string>> CreateVacancy( [FromBody] VacancyRequest request )
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

            var newVacancy = Vacancy
                .Create(
                    new Guid(),
                    request.Title,
                    request.Description,
                    request.JobType,
                    request.JobCategory,
                    request.MaxSalary,
                    request.MinSalary,
                    request.RequiredSkills,
                    request.Experience,
                    request.Industry,
                    request.Address,
                    request.Country,
                    userId
                );
            return Ok(await _vacancyService.CreateVacancy(newVacancy.vacancy));
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        
    }

    [HttpDelete("employers/{userId}/vacancy")]
    public async Task<ActionResult<string>> DeleteVacancy(Guid userId,[FromQuery] Guid vacancyId)
    {
        try
        {
            await _vacancyService.DeleteVacancy(vacancyId);
            return Ok("Resume deleted");
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
        
    }

    [HttpPatch("employers/{userId}/vacancy")]
    public async Task<ActionResult<string>> UpdateVacancy([FromBody] VacancyRequest request, Guid userId, Guid vacancyId)
    {
        var updateData = new Vacancy(
            vacancyId,
            request.Title,
            request.Description,
            request.JobType,
            request.JobCategory,
            request.MaxSalary,
            request.MinSalary,
            request.RequiredSkills,
            request.Experience,
            request.Industry,
            request.Address,
            request.Country,
            request.EmployerId
        );
        await _vacancyService.UpdateVacancy(vacancyId, updateData);
        return Ok("Vacancy Updated");
    }
    
    [HttpGet ("/employers/{userId}/vacancies/{vacancyId}")]
    public async Task<ActionResult<VacancyResponce>> GetVacancyOfCurrentEmployer([FromQuery] Guid vacancyId, [FromQuery] Guid userId)
    {
        
            var vacancies = await _vacancyService.GetAllOfEmployer(userId);
            var currentVacancy = vacancies.FirstOrDefault(x => x.Id == vacancyId);
            if (currentVacancy != null)
                return Ok(
                    new VacancyResponce(
                        currentVacancy.Id,
                        currentVacancy.Title,
                        currentVacancy.Description,
                        currentVacancy.JobType,
                        currentVacancy.JobCategory,
                        currentVacancy.MaxSalary,
                        currentVacancy.MinSalary,
                        currentVacancy.RequiredSkills,
                        currentVacancy.Experience,
                        currentVacancy.Industry,
                        currentVacancy.Address,
                        currentVacancy.Country,
                        userId
                    ));
            return BadRequest("dd");


    }


}