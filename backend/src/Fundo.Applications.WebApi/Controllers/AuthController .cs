using Fundo.Applications.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fundo.Applications.WebApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            if (request.Username != "admin"
                || request.Password != "123456")
            {
                return Unauthorized();
            }

            var tokenHandler =
                new JwtSecurityTokenHandler();

            var key =
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]);

            var descriptor =
                new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                        new[]
                        {
                        new Claim(
                            ClaimTypes.Name,
                            request.Username)
                        }),
                    Expires = DateTime.UtcNow.AddHours(8),
                    SigningCredentials =
                        new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature)
                };

            var token =
                tokenHandler.CreateToken(descriptor);

            return Ok(
                new LoginResponse
                {
                    Token =
                        tokenHandler.WriteToken(token)
                });
        }
    }
}
