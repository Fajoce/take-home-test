using Fundo.Applications.WebApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Fundo.Applications.WebApi
{
    public class LoanDbContext : DbContext
    {
        public LoanDbContext(DbContextOptions<LoanDbContext> options)
            : base(options)
        {
        }
        public DbSet<Loan> Loans => Set<Loan>();
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Loan>().HasData(

                new Loan
                {
                    Id = 1,
                    Amount = 25000,
                    CurrentBalance = 18750,
                    ApplicantName = "Juan Doe",
                    Status = LoanStatus.Active
                },

                new Loan
                {
                    Id = 2,
                    Amount = 15000,
                    CurrentBalance = 0,
                    ApplicantName = "Fulana",
                    Status = LoanStatus.Paid
                },

                new Loan
                {
                    Id = 3,
                    Amount = 50000,
                    CurrentBalance = 32500,
                    ApplicantName = "Robert Johnson",
                    Status = LoanStatus.Paid
                }
            );
        }
    }
}
