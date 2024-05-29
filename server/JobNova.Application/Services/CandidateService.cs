using JobNova.Core.Abstractions.Interfaces;
using JobNova.Core.Infrastructure;
using JobNova.Core.Infrostructure;
using JobNova.Core.Models;
using JobNova.DataAccess.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace JobNova.Application.Services;



public class CandidateService : ICandidateService
{
    private readonly ICandidateRepository _candidateRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly IPasswordHasher _passwordHasher ;

    public CandidateService(ICandidateRepository candidateRepository, 
        IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
    {
        _jwtProvider = jwtProvider;
        _passwordHasher = passwordHasher;
        _candidateRepository = candidateRepository;
    }
    
    public async Task<List<Candidate>> GetAllCandidates()
    {
        return await _candidateRepository.GetAll();
    }

    public async Task<Candidate> GetById(Guid id)
    {
        try
        {
            return await _candidateRepository.GetById(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public async Task<string> CreateCandidate(Candidate candidate)
    {
        candidate.PasswordHash = _passwordHasher.Generate(candidate.PasswordHash);
        _jwtProvider.GenerateToken(candidate);
        return await _candidateRepository.Create(candidate);
        
    }

    public async Task<string> UpdateCandidate(Guid candidateId, Candidate candidateToUpdate)
    {
        return await _candidateRepository.Update(candidateId, candidateToUpdate);
    }

    public async Task<string> DeleteCandidate(Guid id)
    {
        return await _candidateRepository.Delete(id);
        
    }
    
    public async Task<Candidate> GetCandidateByEmail(string? email)
    {
        var data = await _candidateRepository.GetCandidateByEmail(email);
        if (data.error == string.Empty)
            return data.candidate;
        throw new ArgumentException("There is no such candidate");
    }

    public async Task<bool> FindCandidateByEmail(string email)
    {
        var data = await _candidateRepository.GetCandidateByEmail(email);
        if (data.error == string.Empty)
            return true;
        return false;
    }

    public async Task<string> Registration(Candidate candidate)
    {
        try
        {
            candidate.PasswordHash = _passwordHasher.Generate(candidate.PasswordHash);
            await _candidateRepository.Create(candidate);
            return candidate.FirstName + " " + candidate.LastName;
        }
        catch (Exception e)
        {
            return e.Message;
        }
        
    }

    public async Task<(string token, Candidate user)> LogIn(string password,  Candidate candidateInBase)
    {
        try
        {
            if(! _passwordHasher.Verify(password, candidateInBase.PasswordHash))
                throw new Exception("Password is incorrect");

            _jwtProvider.GenerateToken(candidateInBase);
            return (_jwtProvider.GenerateToken(candidateInBase), candidateInBase);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
    
}