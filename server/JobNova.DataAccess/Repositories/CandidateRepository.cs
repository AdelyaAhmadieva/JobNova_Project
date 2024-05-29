using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobNova.DataAccess.Repositories;

public class CandidateRepository : ICandidateRepository
{
    private readonly JobNovaDbContext _context;

    public CandidateRepository(JobNovaDbContext context)
    {
        _context = context;
    }

    public async Task<List<Candidate>> GetAll()
    {
        var raw = await _context.Candidates.AsNoTracking().ToListAsync();

        return raw.Select(x => new Candidate(x.Id, x.FirstName, x.LastName, x.Email, x.Role, x.PasswordHash,
            x.Introduction, x.Phone, x.Website, x.Occupation, x.Skills)).ToList();

    }
    
    public async Task<Candidate> GetById(Guid id)
    {
        var raw = await _context.Candidates.AsNoTracking().Where(x => x.Id == id).FirstOrDefaultAsync();
        
        return new Candidate(raw.Id, raw.FirstName, raw.LastName, raw.Email, raw.Role, raw.PasswordHash,
            raw.Introduction, raw.Phone, raw.Website, raw.Occupation, raw.Skills);
    }

    public async Task<string> Create(Candidate candidate)
    {
        var candidateEntity = new CandidateEntity()
        {
            Id = candidate.Id,
            FirstName = candidate.FirstName,
            LastName = candidate.LastName,
            Email = candidate.Email,
            PasswordHash = candidate.PasswordHash,
            Role = candidate.Role,
            Introduction = candidate.Introduction,
            Occupation = candidate.Occupation,
            Phone = candidate.Phone,
            Skills = candidate.Skills
        };
        await _context.Candidates.AddAsync(candidateEntity);
        await _context.SaveChangesAsync();
        return "User created successfully";
    }

    public async Task<string> Update(Guid id, Candidate candidate)
    {
        await _context.Candidates.Where(x => x.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(x => x.FirstName, x => candidate.FirstName)
                .SetProperty(x => x.LastName, x => candidate.LastName)
                .SetProperty(x => x.Introduction, x => candidate.Introduction)
                .SetProperty(x => x.Occupation, x => candidate.Occupation)
                .SetProperty(x => x.Phone, x => candidate.Phone)
                .SetProperty(x => x.Skills, x => candidate.Skills)
                
            );
        await _context.SaveChangesAsync();
        return "User updated successfully";
    }

    public async Task<string> Delete(Guid id)
    {
        await _context.Candidates.Where(x => x.Id == id).ExecuteDeleteAsync();
        await _context.SaveChangesAsync();

        return "User deleted successfully";
    }

    public async Task<(Candidate candidate, string error)> GetCandidateByEmail(string email)
    {
        var userWithEmail = await _context.Candidates
            .Where(x => x.Email == email)
            .AsNoTracking()
            .FirstOrDefaultAsync();
        
        if(userWithEmail == null)
            return (null, "User not found")!;
        return (new Candidate(
            userWithEmail.Id, userWithEmail.FirstName, userWithEmail.LastName, userWithEmail.Email, userWithEmail.Role, userWithEmail.PasswordHash,
            userWithEmail.Introduction, userWithEmail.Phone, userWithEmail.Website, userWithEmail.Occupation, userWithEmail.Skills
            ), string.Empty);
    }

}