using Fundo.Applications.WebApi.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fundo.Applications.WebApi.Services
{

    public class LoanService: ILoanService
    {
        private readonly LoanDbContext _context;
        private readonly ILogger<LoanService> _logger;

        public LoanService(LoanDbContext context, ILogger<LoanService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Loan>> GetAllAsync()
        {
            return await _context.Loans
                .OrderBy(x => x.Id)
                .ToListAsync();
        }

        public async Task<Loan?> GetByIdAsync(int id)
        {
            _logger.LogWarning(
    "Loan {LoanId} not found",
    id);
            return await _context.Loans
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Loan> CreateAsync(Loan loan)
        {
            loan.CurrentBalance = loan.Amount;
            loan.Status = LoanStatus.Active;
            _logger.LogInformation(
    "Creating loan for {Applicant} amount {Amount}",
    loan.ApplicantName,
    loan.Amount);
            _context.Loans.Add(loan);

            await _context.SaveChangesAsync();

            return loan;
        }

        public async Task<bool> ApplyPaymentAsync(
            int loanId,
            decimal payment)
        {
            var loan = await _context.Loans
                .FirstOrDefaultAsync(x => x.Id == loanId);

            if (loan == null)
                return false;

            loan.CurrentBalance -= payment;

            if (loan.CurrentBalance <= 0)
            {
                loan.CurrentBalance = 0;
                loan.Status = LoanStatus.Paid;
            }

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
