using JobNova.Core.Models;

namespace JobNova.Core.Abstractions.Interfaces.RepositoryInterfaces;

public interface IEmployerRepository
{
    Task<List<Employer>> GetAll();
    Task<Employer> GetById(Guid id);
    Task<string> Create(Employer employer);
    Task<string> Update(Guid id, Employer employer);
    Task<string> Delete(Guid id);
    Task<(Employer employer, string error)> GetEmployerByEmail(string email);


}