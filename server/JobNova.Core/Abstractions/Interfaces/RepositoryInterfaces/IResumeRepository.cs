using JobNova.Core.Models;

namespace JobNova.DataAccess.Repositories;

public interface IResumeRepository
{
    Task<List<Resume>> GetAll( );
    Task<string> CreateResume(Resume resume);
    Task<string> DeleteResume(Guid resumeId);
    Task<string> UpdateResume(Guid resumeId, string description, List<string> skills);
    Task<List<Resume>> GetAllOfCandidate(Guid id);
}