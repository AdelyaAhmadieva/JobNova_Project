namespace JobNova_server.Controllers.Contracts;

public record VacancyRequest
(
    string Title ,
    string Description ,
    string JobType ,
    string JobCategory ,
    
    int? MinSalary ,
    int? MaxSalary,

    List<string> RequiredSkills ,
    string Experience,
    string Industry,
    string Address ,
    string Country ,

    Guid EmployerId 
    )
{
    
}