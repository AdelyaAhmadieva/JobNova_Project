using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface ICandidateService
{
    Task<List<Candidate>> GetAllCandidates();
    Task<Candidate> GetById(Guid id);
    Task<string> CreateCandidate(Candidate user);
    Task<string> UpdateCandidate(Guid candidateId, Candidate candidateToUpdate);
    Task<string> DeleteCandidate(Guid id);
    Task<Candidate> GetCandidateByEmail(string? email);
    Task<bool> FindCandidateByEmail(string email);
    Task<string> Registration(Candidate candidate);
    Task<(string token, Candidate user)> LogIn(string password, Candidate candidateInBase);
}