namespace JobNova_server.Controllers.Contracts;

public record ResumeRequest
    (
        string Description,
        List<string?> Skills)
{
    
}