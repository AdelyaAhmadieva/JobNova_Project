using JobNova.Core.Abstractions.Interfaces.RepositoryInterfaces;
using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobNova.DataAccess.Repositories;

public class EmployerRepository : IEmployerRepository
{
    
    private readonly JobNovaDbContext _context;

    public EmployerRepository(JobNovaDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employer>> GetAll()
    {
        var raw = await _context.Employers.AsNoTracking().ToListAsync();
        return raw.Select(x =>
            new Employer(
                x.Id,
                x.EmployerName,
                x.Email,
                x.Role,
                x.PasswordHash,
                x.Founder,
                x.FoundingDate,
                x.Address,
                x.NumberOfEmployees,
                x.Website,
                x.Story,
                x.EmailToConnect
            )).ToList();
    }
    
    public async Task<Employer> GetById(Guid id)
    {
        var raw = await _context.Employers.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync();
        return
            new Employer(
                raw.Id,
                raw.EmployerName,
                raw.Email,
                raw.Role,
                raw.PasswordHash,
                raw.Founder,
                raw.FoundingDate,
                raw.Address,
                raw.NumberOfEmployees,
                raw.Website,
                raw.Story,
                raw.EmailToConnect
            );
    }

    public async Task<string> Create(Employer employer)
    {
        var employerEntity = new EmployerEntity()
        {
            Id = employer.Id,
            EmployerName = employer.EmployerName,
            Email = employer.Email,
            PasswordHash = employer.PasswordHash,
            Role = employer.Role
        };
        await _context.Employers.AddAsync(employerEntity);
        await _context.SaveChangesAsync();
        return "Employer created successfully";
    }

    public async Task<string> Update(Guid id, Employer employer)
    {
        
        await _context.Employers.Where(x => x.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(x => x.EmployerName, x => employer.EmployerName)
                .SetProperty(x => x.Founder, x => employer.Founder)
                .SetProperty(x => x.FoundingDate, x => employer.FoundingDate)
                .SetProperty(x => x.Address, x => employer.Address)
                .SetProperty(x => x.NumberOfEmployees, x => employer.NumberOfEmployees)
                .SetProperty(x => x.Website, x => employer.Website)
                .SetProperty(x => x.Story, x => employer.Story)
                .SetProperty(x => x.EmailToConnect, x => employer.EmailToConnect)
            );
        await _context.SaveChangesAsync();
        return "Employer updated successfully: " + employer.EmployerName + employer.Founder;
    }

    public async Task<string> Delete(Guid id)
    {
        await _context.Employers.Where(x => x.Id == id).ExecuteDeleteAsync();
        await _context.SaveChangesAsync();

        return "User deleted successfully";
    }

    public async Task<(Employer employer, string error)> GetEmployerByEmail(string email)
    {
        var userWithEmail = await _context.Employers
            .Where(x => x.Email == email)
            .AsNoTracking()
            .FirstOrDefaultAsync();
        
        if(userWithEmail == null)
            return (null, "User not found")!;
        return (new Employer(
            userWithEmail.Id,
            userWithEmail.EmployerName,
            userWithEmail.Email,
            userWithEmail.Role,
            userWithEmail.PasswordHash,
            userWithEmail.Founder,
            userWithEmail.FoundingDate,
            userWithEmail.Address,
            userWithEmail.NumberOfEmployees,
            userWithEmail.Website,
            userWithEmail.Story,
            userWithEmail.EmailToConnect
            ), string.Empty);
    }

}

