namespace JobNova.Core.Models;

public class Resume
{
    public const int MaxLength = 250;
    public Resume(Guid id, string description, Guid candidateId, List<string> skills)
    {
        Id = id;
        Description = description;
        CandidateId = candidateId;
        Skills = skills;
    }
    public Guid Id { get; set; }
    public string Description { get; set; }
   
    public Guid CandidateId{ get; set; }
    public Candidate Candidate { get; set; } = null!;
    public List<string> Skills;



    public static (string error, Resume resume) 
        Create(Guid id,  string description, Guid employerId, List<string?> skills)
    {
        string error = String.Empty;
        var resume = new Resume(id, description, employerId, skills);
        
        if (description.Length > MaxLength && description.Length <= 10 )
            error = "length error";
        
        return (error, resume);
    }
}