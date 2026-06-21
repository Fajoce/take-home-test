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
                    ApplicantName = "Fabio Ortiz",
                    Status = LoanStatus.Active
                },

                new Loan
                {
                    Id = 2,
                    Amount = 15000,
                    CurrentBalance = 0,
                    ApplicantName = "Johana Gonzalz",
                    Status = LoanStatus.Paid
                },

                new Loan
                {
                    Id = 3,
                    Amount = 50000,
                    CurrentBalance = 32500,
                    ApplicantName = "Nicolle Ortiz",
                    Status = LoanStatus.Active
                },
                new Loan
                {
                    Id = 4,
                    Amount = 670000,
                    CurrentBalance = 0,
                    ApplicantName = "Grego Charris",
                    Status = LoanStatus.Paid
                },
                new Loan
                {
                    Id = 5,
                    Amount = 560000,
                    CurrentBalance = 0,
                    ApplicantName = "Jocelyn Ortiz",
                    Status = LoanStatus.Paid
                }
            );
        }
    }
}
