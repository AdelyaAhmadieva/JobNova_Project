namespace JobNova.DataAccess.Entities;

public class ResumeEntity
{

    public Guid Id { get; set; }
    public string Description { get; set; } = String.Empty;

    public List<string> Skills { get; set; } = new List<string>();

    public Guid CandidateId { get; set; }
    public CandidateEntity CandidateEntity { get; set; } = null!;
}