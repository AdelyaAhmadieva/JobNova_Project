using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobNova.DataAccess.Repositories;

public class ResumeRepository : IResumeRepository
{
    private readonly JobNovaDbContext _context;

    public ResumeRepository(JobNovaDbContext context)
    {
        _context = context;
    }

    public async Task<List<Resume>> GetAll( )
    {
        var data = await _context.Resumes.AsNoTracking().ToListAsync();
        return data.Select(x => new Resume(x.Id, x.Description, x.CandidateId, x.Skills)).ToList();
    }

    public async Task<string> CreateResume(Resume resume)
    {
        var resumeEntity = new ResumeEntity()
        {
            Id = resume.Id,
            Description = resume.Description,
            CandidateId = resume.CandidateId,
            Skills = resume.Skills
        };
        await _context.Resumes.AddAsync(resumeEntity);
        await _context.SaveChangesAsync();

        return "Resume created";
    }

    public async Task<string> DeleteResume(Guid resumeId)
    {
        await _context.Resumes.Where(x => x.Id == resumeId).ExecuteDeleteAsync();
        await _context.SaveChangesAsync();
        return "Resume deleted";
    }

    public async Task<string> UpdateResume(Guid resumeId, string description, List<string> skills)
    {
        await _context.Resumes.Where(x => x.Id == resumeId)
            .ExecuteUpdateAsync(r =>
                r.SetProperty(x => x.Description, x => description)
                    .SetProperty(x => x.Skills, x => skills));
        return "Resume Updated";
    }

    public async Task<List<Resume>> GetAllOfCandidate(Guid id)
    {
        var data = await _context.Resumes
            .Where(x => x.CandidateId == id)
            .AsNoTracking().ToListAsync();
        return data.Select(x => new Resume(x.Id, x.Description, x.CandidateId, x.Skills)).ToList();
    }
    
}