using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobNova.DataAccess.Repositories;

public class VacancyRepository : IVacancyRepository
{
    private readonly JobNovaDbContext _context;

    public VacancyRepository(JobNovaDbContext context)
    {
        _context = context;
    }

    public async Task<List<Vacancy>> GetAll()
    {
        var data = await _context.Vacancies.AsNoTracking().ToListAsync();
        return data.Select(x => new Vacancy(
            x.Id,
            x.Title,
            x.Description,
            x.JobType,
            x.JobCategory,
            x.MaxSalary,
            x.MinSalary,
            x.RequiredSkills,
            x.Experience,
            x.Industry,
            x.Address,
            x.Country,
            x.EmployerId
        )).ToList();
    }

    public async Task<string> CreateVacancy(Vacancy vacancy)
    {
        var vacancyEntity = new VacancyEntity()
        {
            Id = vacancy.Id,
            Title = vacancy.Title,
            Description = vacancy.Description,
            JobType = vacancy.JobType,
            JobCategory = vacancy.JobCategory,
            MaxSalary = vacancy.MaxSalary,
            MinSalary = vacancy.MinSalary,
            RequiredSkills = vacancy.RequiredSkills,
            Experience = vacancy.Experience,
            Industry = vacancy.Industry,
            Address = vacancy.Address,
            Country = vacancy.Country,
            EmployerId = vacancy.EmployerId
        };
        await _context.Vacancies.AddAsync(vacancyEntity);
        await _context.SaveChangesAsync();

        return "Vacancy created successfully";
    }

    public async Task<string> DeleteVacancy(Guid vacancyId)
    {
        await _context.Vacancies.Where(x => x.Id == vacancyId).ExecuteDeleteAsync();
        await _context.SaveChangesAsync();
        return "Vacancy deleted";
    }

    public async Task<string> UpdateVacancy(Guid vacancyId, Vacancy updateData)
    {
        await _context.Vacancies.Where(x => x.Id == vacancyId)
            .ExecuteUpdateAsync(v =>
                v.SetProperty(x => x.Title, x => updateData.Title)
                    .SetProperty(x => x.Description, x => updateData.Description)
                    .SetProperty(x => x.JobType, x => updateData.JobType)
                    .SetProperty(x => x.JobCategory, x => updateData.JobCategory)
                    .SetProperty(x => x.MinSalary, x => updateData.MinSalary)
                    .SetProperty(x => x.MaxSalary, x => updateData.MaxSalary)
                    .SetProperty(x => x.RequiredSkills, x => updateData.RequiredSkills)
                    .SetProperty(x => x.Experience, x => updateData.Experience)
                    .SetProperty(x => x.Industry, x => updateData.Industry)
                    .SetProperty(x => x.Address, x => updateData.Address)
                    .SetProperty(x => x.Country, x => updateData.Country));
                   
        return "Vacancy Updated";
    }

    public async Task<List<Vacancy>> GetAllOfEmployer(Guid id)
    {
        var data = await _context.Vacancies
            .Where(x => x.EmployerId == id)
            .AsNoTracking().ToListAsync();
        return data.Select(x => new Vacancy(
            x.Id,
            x.Title,
            x.Description,
            x.JobType,
            x.JobCategory,
            x.MaxSalary,
            x.MinSalary,
            x.RequiredSkills,
            x.Experience,
            x.Industry,
            x.Address,
            x.Country,
            x.EmployerId
            )).ToList();
    }
}