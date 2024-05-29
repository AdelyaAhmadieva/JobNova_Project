using JobNova.Core.Abstractions.Interfaces.RepositoryInterfaces;
using JobNova.Core.Infrastructure;
using JobNova.Core.Infrostructure;
using JobNova.Core.Models;
using JobNova.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace JobNova.Application.Services;

public class EmployerService : IEmployerService
{
     private readonly IEmployerRepository _employerRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly IPasswordHasher _passwordHasher ;

    public EmployerService(IEmployerRepository employerRepository, 
        IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
    {
        _jwtProvider = jwtProvider;
        _passwordHasher = passwordHasher;
        _employerRepository = employerRepository;
    }
    
    public async Task<List<Employer>> GetAllEmployers()
    {
        return await _employerRepository.GetAll();
    }

    public async Task<Employer> GetById(Guid id)
    {
        try
        {
            return await _employerRepository.GetById(id);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public async Task<string> CreateEmployer(Employer employer)
    {
        employer.PasswordHash = _passwordHasher.Generate(employer.PasswordHash);
        _jwtProvider.GenerateToken(employer);
        return await _employerRepository.Create(employer);
        
    }

    public async Task<string> UpdateEmployer(Guid employerId, Employer employerToUpdate)
    {
        return await _employerRepository.Update(employerId, employerToUpdate);
    }

    public async Task<string> DeleteEmployer(Guid id)
    {
        return await _employerRepository.Delete(id);
        
    }
    
    public async Task<Employer> GetEmployerByEmail(string? email)
    {
        var data = await _employerRepository.GetEmployerByEmail(email);
        if (data.error == string.Empty)
            return data.employer;
        throw new ArgumentException("There is no such employer");
    }

    public async Task<bool> FindEmployerByEmail(string email)
    {
        var data = await _employerRepository.GetEmployerByEmail(email);
        if (data.error == string.Empty)
            return true;
        return false;
    }

    public async Task<string> Registration(Employer employer)
    {
        try
        {
            employer.PasswordHash = _passwordHasher.Generate(employer.PasswordHash);
            await _employerRepository.Create(employer);
            return employer.EmployerName;
        }
        catch (Exception e)
        {
            return e.Message;
        }
        
    }

    public async Task<(string token, Employer user)> LogIn(string password,  Employer employerInBase)
    {
        try
        {
            if(! _passwordHasher.Verify(password, employerInBase.PasswordHash))
                throw new Exception("Password is incorrect");

            _jwtProvider.GenerateToken(employerInBase);
            return (_jwtProvider.GenerateToken(employerInBase), employerInBase);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
    
}