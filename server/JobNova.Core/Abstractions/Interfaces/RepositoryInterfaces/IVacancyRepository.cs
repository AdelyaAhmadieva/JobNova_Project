using JobNova.Core.Models;

namespace JobNova.DataAccess.Repositories;

public interface IVacancyRepository
{
    Task<List<Vacancy>> GetAll();
    Task<string> CreateVacancy(Vacancy vacancy);
    Task<string> DeleteVacancy(Guid vacancyId);
    Task<string> UpdateVacancy(Guid vacancyId, Vacancy updateData);
    Task<List<Vacancy>> GetAllOfEmployer(Guid id);
}