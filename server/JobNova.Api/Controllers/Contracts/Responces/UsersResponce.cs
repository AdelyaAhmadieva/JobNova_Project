namespace JobNova_server.Controllers.Contracts;

public record UsersResponce
(
    Guid Id,
    string UserName,
    string? Email,
    string Role,
    string? PasswordHash)
{

}