using JobNova.Core.Models;

namespace JobNova.Core.Abstractions.Interfaces;

public interface IUserRepository
{
    Task<List<User>> GetAllUsers();
    Task<Guid> CreateUser(User user);
    Task<string> DeleteUser(Guid userId);
    Task<User> GetUserByEmail(string? email);

}