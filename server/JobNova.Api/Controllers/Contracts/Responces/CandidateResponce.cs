namespace JobNova_server.Controllers.Contracts;

public record CandidateResponce
(
    Guid UserId,
    string FirstName,
    string LastName,
    string Email,
    string? Introduction,
    string? Phone,
    string? Website,
    string? Occupation,
    List<string>? Skills,
    List<ResumeResponce> Resumes)
{
    
}
