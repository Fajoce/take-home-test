using Fundo.Applications.WebApi.Middlwares;
using Fundo.Applications.WebApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Fundo.Applications.WebApi
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<LoanDbContext>(options =>
               options.UseSqlServer(
                   _configuration.GetConnectionString("DefaultConnection")
               )
           );

            services.AddScoped<ILoanService, LoanService>();

            services.AddSwaggerGen();
        }

        public void Configure(
    IApplicationBuilder app,
    IWebHostEnvironment env)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Loan API V1");
            });
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
