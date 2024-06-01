using JobNova.Core.Models;
using JobNova.DataAccess.Repositories;

namespace JobNova.Application.Services;

public class VacancyService : IVacancyService
{
    private readonly IVacancyRepository _vacancyRepository;

    public VacancyService(IVacancyRepository vacancyRepository)
    {
        _vacancyRepository = vacancyRepository;
    }


    public async Task<List<Vacancy>> GetAllVacancies()
    {
        return await _vacancyRepository.GetAll();
    }

    public async Task<string> CreateVacancy(Vacancy resume)
    {
        return await _vacancyRepository.CreateVacancy(resume);
    }

    public async Task<string> DeleteVacancy(Guid resumeId)
    {
        return await _vacancyRepository.DeleteVacancy(resumeId);
    }

    public async Task<string> UpdateVacancy(Guid vacancyId, Vacancy updateData)
    {
        return await _vacancyRepository.UpdateVacancy(vacancyId, 
            new Vacancy(
                updateData.Id,
                updateData.Title,
                updateData.Description,
                updateData.JobType,
                updateData.JobCategory,
                updateData.MaxSalary,
                updateData.MinSalary,
                updateData.RequiredSkills,
                updateData.Experience,
                updateData.Industry,
                updateData.Address,
                updateData.Country,
                updateData.EmployerId
                ));
    }

    public async Task<List<Vacancy>> GetAllOfEmployer(Guid id)
    {
        return await _vacancyRepository.GetAllOfEmployer(id);
    }
}