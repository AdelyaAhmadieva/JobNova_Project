namespace JobNova_server.Controllers.Contracts;

public record CandidateRequest
(
    string FirstName,
    string LastName,
    string Email,
    string Password)
{
    
}