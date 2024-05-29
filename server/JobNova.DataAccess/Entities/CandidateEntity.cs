namespace JobNova.DataAccess.Entities;

public class CandidateEntity
{
    public Guid Id { get; set; } 
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? PasswordHash { get; set; } = string.Empty;

    public string? Introduction { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;
    public string? Website { get; set; } = string.Empty;

    public string? Occupation { get; set; } = string.Empty;

    public List<string?>? Skills { get; set; } = new List<string>();
    public ICollection<ResumeEntity> Resumes { get; } = new List<ResumeEntity>();
}