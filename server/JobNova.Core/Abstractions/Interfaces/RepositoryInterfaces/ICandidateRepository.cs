using JobNova.Core.Models;

namespace JobNova.DataAccess.Repositories;

public interface ICandidateRepository
{
    Task<List<Candidate>> GetAll();
    Task<Candidate> GetById(Guid id);
    Task<string> Create(Candidate candidate);
    Task<string> Update(Guid id, Candidate candidate);
    Task<string> Delete(Guid id);
    Task<(Candidate candidate, string error)> GetCandidateByEmail(string email);
}