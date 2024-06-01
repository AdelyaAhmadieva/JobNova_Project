using System.Text;
using JobNova.Application.Services;
using JobNova.Core.Abstractions.Interfaces;
using JobNova.Core.Abstractions.Interfaces.RepositoryInterfaces;
using JobNova.Core.Infrastructure;
using JobNova.Core.Infrostructure;
using JobNova.DataAccess;
using JobNova.DataAccess.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<JobNovaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(JobNovaDbContext))));
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(nameof(JwtOptions)));



builder.Services.AddScoped<ICandidateRepository, CandidateRepository>();
builder.Services.AddScoped<ICandidateService, CandidateService>();

builder.Services.AddScoped<IResumeRepository, ResumeRepository>();
builder.Services.AddScoped<IResumeService, ResumeService>();

builder.Services.AddScoped<IEmployerRepository, EmployerRepository>();
builder.Services.AddScoped<IEmployerService, EmployerService>();

builder.Services.AddScoped<IVacancyRepository, VacancyRepository>();
builder.Services.AddScoped<IVacancyService, VacancyService>();

builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );

var jwtOptions = new JwtOptions();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme ,options =>{
        
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtOptions.SecretKey))
                
            };
            
            /*
             options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    context.Token = context.Request.Cookies["UserId"];
                    return Task.CompletedTask;
                }
            };
            */
            
        });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy" ,policy =>
    {
        policy.RequireClaim("Admin", "true");
    });
    options.AddPolicy("CandidatePolicy", policy =>
    {
        policy.RequireClaim("Candidate", "true");
    });
    options.AddPolicy("EmployerPolicy", policy =>
    {
        policy.RequireClaim("Employer", "true");
    });
});


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy  =>
        {
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
            policy.AllowCredentials();
        });
});
var app = builder.Build();

app.UseCors();

/*
app.Use(( ctx, next) =>
{
    ctx.Response.Headers["Access-Control-Allow-Origin"] = "*";
    return next();
});
*/

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();

