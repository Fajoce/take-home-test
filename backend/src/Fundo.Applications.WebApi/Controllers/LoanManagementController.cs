using Fundo.Applications.WebApi.DTOs;
using Fundo.Applications.WebApi.Entities;
using Fundo.Applications.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace Fundo.Applications.WebApi.Controllers
{
    /// <summary>
    /// Gestión de préstamos.
    /// </summary>
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

        /// <summary>
        /// Obtiene todos los préstamos.
        /// </summary>
        /// <returns>Listado de préstamos.</returns>
    
   
        [ProducesResponseType(typeof(List<Loan>), 200)]
        [ProducesResponseType(401)]
        [HttpGet]
        public async Task<ActionResult<List<Loan>>> GetAll()
        {
            var loans = await _service.GetAllAsync();

            return Ok(loans);
        }

        /// <summary>
        /// Obtiene un préstamo por id.
        /// </summary>
       
        [ProducesResponseType(typeof(Loan), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetById(
            int id)
        {
            var loan = await _service.GetByIdAsync(id);

            if (loan == null)
                return NotFound();

            return Ok(loan);
        }

        /// <summary>
        /// Crea un préstamo.
        /// </summary>
     
        [ProducesResponseType(typeof(Loan), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
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
        /// <summary>
        /// Aplica un pago a un préstamo.
        /// </summary>
 
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
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