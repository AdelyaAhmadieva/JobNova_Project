namespace JobNova_server.Controllers.Contracts;

public record UserRequest(
    string UserName,
    string? Email,
    string Role,
    string? Password)
{
    
}