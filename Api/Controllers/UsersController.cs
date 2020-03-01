using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Core.Models;
using AutoMapper;
using Api.Core;
using Api.Controllers.DTOs;
using System.Collections.Generic;

namespace Api.Controllers {

    [ApiController]
    [Authorize]
    [Route ("/api/user")]
    public class UsersController : Controller {
        private IMapper _mapper { get; }
        private IUserRepository _repository { get; }
        public UsersController (IMapper mapper, IUserRepository repository) {
            _repository = repository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost ("authenticate")]
        public IActionResult Authenticate ([FromBody] UserToLogin userToLogin) {
            var user = _repository.Authenticate (userToLogin);

            if(user != null)
            {
                if(userToLogin.IsAdmin) {
                    if(user.Role != Role.Admin)
                        return BadRequest("User not allowed, Please login as a normal user");
                } else {
                    if(user.Role != Role.User)
                        return BadRequest("Please login as admin to get access");
                }
            }

            if (user == null)
                return BadRequest("Incorrect combination of email and/or password");
            var tokenString = _repository.CreateToken(user);
            var userWithToken = new UserWithToken {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = tokenString,
                Role = user.Role.ToString()
            };
            return Ok (userWithToken);
        }

        [HttpGet("getAdminUsers/{userId}")]
        public async Task<IActionResult> GetAdminUsers(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) || User.FindFirst(ClaimTypes.Role).Value != Role.User.ToString()) {
                return Unauthorized();
            }
            var adminUsers = await _repository.GetAdminUsers();
            var adminUsersToReturn = _mapper.Map<IEnumerable<UserToReturn>>(adminUsers);
            return Ok(adminUsersToReturn);
        }       

        [AllowAnonymous]
        [HttpPost ("register")]
        public async Task<IActionResult> Register ([FromBody] UserDTO userDTO) {
            var user = _mapper.Map<User> (userDTO);
            if (await _repository.UserExists (user))
                return BadRequest ("User already exists");
            user.EmailVerified = false;
            try {
                _repository.CreateUser (user, userDTO.Password);
                var message = new Message {
                    FromName = "Story",
                    FromEmail = "noreply@story.com",
                    ToName = user.Name,
                    ToEmail = user.Email,
                    Subject = "Account Creation",
                    HtmlContent = "Your account was created successfully"
                };
                _repository.SendEmail(message);
                await _repository.SaveAllChanges();
                return Ok ();
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
        }
    }
}