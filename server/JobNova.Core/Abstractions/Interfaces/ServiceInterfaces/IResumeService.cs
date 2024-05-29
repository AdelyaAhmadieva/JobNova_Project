using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface IResumeService
{
    Task<List<Resume>> GetAllResumes();
    Task<string> CreateResume(Resume resume);
    Task<string> DeleteResume(Guid resumeId);
    
    Task<string> UpdateResume(Guid resumeId, string description, List<string?> skills);
    Task<List<Resume>> GetAllOfCandidate(Guid id);
}