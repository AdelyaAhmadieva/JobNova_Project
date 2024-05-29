using JobNova.Core.Models;
using JobNova.DataAccess.Repositories;

namespace JobNova.Application.Services;

public class ResumeService : IResumeService
{
    private readonly IResumeRepository _resumeRepository;

    public ResumeService(IResumeRepository resumeRepository)
    {
        _resumeRepository = resumeRepository;
    }

    public async Task<List<Resume>> GetAllResumes()
    {
        return await _resumeRepository.GetAll();
    }

    public async Task<string> CreateResume(Resume resume)
    {
        return await _resumeRepository.CreateResume(resume);
    }

    public async Task<string> DeleteResume(Guid resumeId)
    {
        return await _resumeRepository.DeleteResume(resumeId);
    }

    public async Task<string> UpdateResume(Guid resumeId, string description, List<string?> skills)
    {
        return await _resumeRepository.UpdateResume(resumeId, description, skills);
    }

    public async Task<List<Resume>> GetAllOfCandidate(Guid id)
    {
        return await _resumeRepository.GetAllOfCandidate(id);
    }
}