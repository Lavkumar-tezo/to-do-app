using Microsoft.AspNetCore.Mvc;
using TodoAppServices.Interfaces;
using TodoAppDataLayer.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoAppServices.DTOs;

namespace To_do_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserProvider provider, IConfiguration config) : ControllerBase
    {
        private readonly IConfiguration _config = config;
        private readonly IUserProvider _provider = provider;

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDTO dto)
        {
            try
            {
                Guid id =await _provider.ValidateUser(dto, true);
                string token = GenerateToken(dto, id);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //List<User> users = await _provider.GetUsersAsync();
            //User? user = users.FirstOrDefault(emp => string.Equals(dto.Name.ToLower(), emp.Name.ToLower()) && string.Equals(dto.Password.ToLower(), emp.Password.ToLower()));
            //if (user == null)
            //{
            //    return NotFound("User not found");
            //}
            //AuthToken token = new() { Token = GenerateToken(dto, user.Id) };
            //return Ok(token);
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDTO dto)
        {
            try
            {
                Guid id = await _provider.ValidateUser(dto, false);
                string token = GenerateToken(dto, id);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            //List<User> users = await _provider.GetUsersAsync();
            //User? user = users.FirstOrDefault(emp => string.Equals(dto.Name.ToLower(), emp.Name.ToLower()) && string.Equals(dto.Password.ToLower(), emp.Password.ToLower()));
            //if (user != null)
            //{
            //    return BadRequest("User Already existed");
            //}
            //Guid guid = Guid.NewGuid();
            //var token = GenerateToken(dto,guid);
            //await _provider.AddUserAsync(dto, guid);
            //return Ok(token);
        }

        //[Route("[action]")]
        //[HttpGet]
        //[Authorize]
        //public async Task<IActionResult> GetUser()
        //{
        //    try
        //    {
        //        var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
        //        Guid guid = new Guid(claim);
        //        User user = await _provider.GetUser(guid);
        //        return Ok(user);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet("all-claims")]
        //[Authorize]
        //public IActionResult GetAllClaims()
        //{
        //    var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
        //    return Ok(claims);
        //}

        private string GenerateToken(UserDTO emp,Guid id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                   new Claim(JwtRegisteredClaimNames.Sub,_config["Jwt:sub"]!),
                   new Claim("Id",id.ToString()),
                   new Claim("Password",emp.Password),
                   new Claim("UserName",emp.Name)
            };
            var token = new JwtSecurityToken(
             issuer: config["Jwt:iss"],
             audience: config["Jwt:aud"],
             claims: claims,
             expires: DateTime.Now.AddDays(1),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    class AuthToken 
    {
        public string Token { get; set; }
    }
}
