using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface IEmployerService
{
 Task<List<Employer>> GetAllEmployers();
 Task<Employer> GetById(Guid id);
 Task<string> CreateEmployer(Employer employer);
 Task<string> UpdateEmployer(Guid employerId, Employer employerToUpdate);
 Task<string> DeleteEmployer(Guid id);
 Task<Employer> GetEmployerByEmail(string? email);
 Task<bool> FindEmployerByEmail(string email);
 Task<string> Registration(Employer employer);
 Task<(string token, Employer user)> LogIn(string password, Employer employerInBase);

}