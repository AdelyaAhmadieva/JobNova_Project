using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface IUsersService
{
   Task<List<User>> GetAllUsers();
   Task<string> CreateUser(User user);
   Task<string> DeleteUser(Guid id);
   Task<User> GetUserByEmail(string? email);
   Task<string> LogIn(IUserBase user);

}