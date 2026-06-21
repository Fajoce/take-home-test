using Fundo.Applications.WebApi.DTOs;
using Fundo.Applications.WebApi.Entities;
using Fundo.Applications.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fundo.Applications.WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("loan")]
    public class LoanManagementController : Controller
    {
        private readonly ILoanService _service;

        public LoanManagementController(
            ILoanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Loan>>> GetAll()
        {
            var loans = await _service.GetAllAsync();

            return Ok(loans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetById(
            int id)
        {
            var loan = await _service.GetByIdAsync(id);

            if (loan == null)
                return NotFound();

            return Ok(loan);
        }

        [HttpPost]
        public async Task<ActionResult<Loan>> Create(
            [FromBody] Loan loan)
        {
            var result = await _service.CreateAsync(loan);

            return CreatedAtAction(
                nameof(GetById),
                new { id = result.Id },
                result
            );
        }

        [HttpPost("{id}/payment")]
        public async Task<IActionResult> Payment(
            int id,
            [FromBody] PaymentRequest request)
        {
            var result =
                await _service.ApplyPaymentAsync(
                    id,
                    request.Amount);

            if (!result)
                return NotFound();

            return Ok();
        }
    }
}