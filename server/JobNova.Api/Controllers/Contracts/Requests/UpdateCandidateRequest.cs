namespace JobNova_server.Controllers.Contracts;

public record UpdateCandidateRequest(
    string FirstName,
    string LastName,
    string Email,
    string? Introduction,
    string? Phone,
    string? Website,
    string? Occupation,
    string[] Skills)
{
    
}