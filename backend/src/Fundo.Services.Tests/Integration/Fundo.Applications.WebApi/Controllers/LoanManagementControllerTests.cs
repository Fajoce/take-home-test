using Fundo.Applications.WebApi;
using Fundo.Applications.WebApi.Entities;
using Fundo.Applications.WebApi.Services;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace Fundo.Services.Tests.Integration
{
    public class LoanManagementControllerTests : IClassFixture<WebApplicationFactory<Fundo.Applications.WebApi.Startup>>
    {
        private readonly HttpClient _client;

        public LoanManagementControllerTests(WebApplicationFactory<Fundo.Applications.WebApi.Startup> factory)
        {
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        public async Task GetBalances_ShouldReturnExpectedResult()
        {
            var response = await _client.GetAsync("/loan");

            Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        }
        private LoanDbContext GetContext()
        {
            var options = new DbContextOptionsBuilder<LoanDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new LoanDbContext(options);
        }

        [Fact]
        public async Task Should_Create_Loan()
        {
            var context = GetContext();

            var service = new LoanService(context);

            var loan = new Loan
            {
                Amount = 1000,
                ApplicantName = "Maria Silva"
            };

            var result = await service.CreateAsync(loan);

            Assert.NotNull(result);
            Assert.Equal(1000, result.CurrentBalance);
            Assert.Equal(LoanStatus.Active, result.Status);
        }

        [Fact]
        public async Task Should_Apply_Payment()
        {
            var context = GetContext();

            var loan = new Loan
            {
                Amount = 1000,
                CurrentBalance = 1000,
                ApplicantName = "Maria"
            };

            context.Loans.Add(loan);
            await context.SaveChangesAsync();

            var service = new LoanService(context);

            await service.ApplyPaymentAsync(loan.Id, 500);

            var updated = await context.Loans.FindAsync(loan.Id);

            Assert.Equal(500, updated.CurrentBalance);
        }
    }
}
