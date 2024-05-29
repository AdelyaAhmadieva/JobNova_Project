namespace JobNova_server.Controllers.Contracts;

public record ResumeResponce(
    Guid id,
    string Description,
    List<string> Skills)
{
    
}