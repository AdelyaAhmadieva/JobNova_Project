using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface IVacancyService
{
    Task<List<Vacancy>> GetAllVacancies();
    Task<string> CreateVacancy(Vacancy resume);
    Task<string> DeleteVacancy(Guid resumeId);
    Task<string> UpdateVacancy(Guid vacancyId, Vacancy updateData);
    Task<List<Vacancy>> GetAllOfEmployer(Guid id);
}