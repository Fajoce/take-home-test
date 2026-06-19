using Fundo.Applications.WebApi.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fundo.Applications.WebApi.Services
{
    public interface ILoanService
    {
        Task<List<Loan>> GetAllAsync();

        Task<Loan?> GetByIdAsync(int id);

        Task<Loan> CreateAsync(Loan loan);

        Task<bool> ApplyPaymentAsync(
            int loanId,
            decimal payment
        );
    }
}
