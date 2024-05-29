using JobNova.Core.Enums;

namespace JobNova_server.Controllers.Contracts.Requests.RegistrationControllerRequests;

public record RegistrationRequest(string FirstName, string LastName, string Email, string Password, string Role)
{
    
}