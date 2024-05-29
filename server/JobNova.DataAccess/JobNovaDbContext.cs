using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobNova.DataAccess;

public class JobNovaDbContext : DbContext
{
    public JobNovaDbContext(DbContextOptions<JobNovaDbContext> options) : base(options)
    {
        
    }
    
     
    
    public DbSet<CandidateEntity> Candidates { get; set; }
    public DbSet<ResumeEntity> Resumes { get; set; }
    
    public DbSet<EmployerEntity> Employers { get; set; }

 //   public DbSet<VacancyEntity> Vacancies { get; set; }
   // public DbSet<EmployerEntity> Employers { get; set; }

    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
       
        
        
        
            //Конфигурация соискателя
            modelBuilder.Entity<CandidateEntity>()
                .HasMany(x => x.Resumes)
                .WithOne(x => x.CandidateEntity)
                .HasForeignKey(x => x.CandidateId);
            
            //Конфигурация нанимателя
            modelBuilder.Entity<EmployerEntity>()
                .HasMany(x => x.Vacancies)
                .WithOne(x => x.EmployerEntity)
                .HasForeignKey(x => x.EmployerId);
            
            //Конфигурация резюме
            modelBuilder.Entity<ResumeEntity>()
                .HasOne(x => x.CandidateEntity)
                .WithMany(x => x.Resumes)
                .HasForeignKey(x => x.CandidateId);
            
            
            //Конфигурация вакансии
            modelBuilder.Entity<VacancyEntity>()
                .HasOne(x => x.EmployerEntity)
                .WithMany(x => x.Vacancies)
                .HasForeignKey(x => x.EmployerId);
                
    }
}