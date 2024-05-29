using JobNova.Core.Models;

namespace JobNova_server.Controllers.Contracts;

public record EmployerResponse
(
    string? employerName,
    string? Id,
    string? founder,
    string? foundingData,
    string? address,
    string? numberOfEmployees,
    string? website,
    string? story,
    string? emailToConnect,
    ICollection<Vacancy?> vacancies)
{
}