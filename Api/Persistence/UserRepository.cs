using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SendGrid;
using SendGrid.Helpers.Mail;
using Api.Core;
using Api.Extensions;
using Api.Controllers.DTOs;

namespace Api.Persistence {
    public class UserRepository : IUserRepository {
        private DataContext _context { get; }
        private AppSettings _appSettings { get; }
        public IConfiguration _configuration { get; }
        public UserRepository (DataContext context, IOptions<AppSettings> appSettings, IConfiguration configuration) {
            _context = context;
            _appSettings = appSettings.Value;
            _configuration = configuration;
        }
        public User Authenticate (UserToLogin userToLogin) {
            if (string.IsNullOrEmpty (userToLogin.Email) || string.IsNullOrEmpty (userToLogin.Password))
                return null;
            var user = _context.Users.SingleOrDefault (u => u.Email == userToLogin.Email);
            if (user == null)
                return null;
            if (!VerifyPasswordHash (userToLogin.Password, user.PasswordHash, user.PasswordSalt))
                return null;
            return user;
        }
        public async Task<User> GetUser (int id) {
            return await _context.Users
                .Where (u => u.Id == id)
                .SingleOrDefaultAsync ();
        }
        public async Task<IEnumerable<User>> GetAdminUsers () {
            return await _context.Users
                .Where(u => u.Role == Role.Admin)
                .ToListAsync();
        }
        public async Task<bool> UserExists (User user) {
            if (await _context.Users.AnyAsync (x => x.Email == user.Email))
                return true;

            return false;
        }
        public async Task<bool> SaveAllChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void CreateUser (User user, string password) {
            if (user == null)
                throw new NullReferenceException ("User cannot be null");
            if (string.IsNullOrWhiteSpace (password))
                throw new ArgumentNullException ("Password is Required");
            byte[] passwordHash, passwordSalt;
            
            CreatePasswordHash (password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Entry(user).State = EntityState.Added;
        }

        public async void SendEmail(Message message)
        {
            var apiKey = _configuration.GetSection("SendGridApiKey").Value;
            var sendGridclient = new SendGridClient (apiKey);
            var from = new EmailAddress (message.FromEmail, message.FromName);
            var subject = message.Subject;
            var to = new EmailAddress (message.ToEmail, message.ToName);
            var htmlContent = $"<div style='background-color: #ffffff; margin: 0 auto;  color: rgb(30, 31, 30);'><div  style='background-color: #fcd2d2; padding: 12px; border-top-left-radius: 8px; border-top-right-radius: 8px;'></div><div style='background-color: #ffffff; padding: 20px; font-size: 20px'>{message.HtmlContent}</div><div style='background-color: #fcd2d2; padding: 9px; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;'></div></div>";
            var msg = MailHelper.CreateSingleEmail (from, to, subject, null, message.HtmlContent);
            var response = await sendGridclient.SendEmailAsync (msg);
        }
        public string CreateToken (User user) {
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
            var sub = new ClaimsIdentity ();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                new Claim (ClaimTypes.Role, user.Role.ToString ())
                }),
                Expires = DateTime.UtcNow.AddMinutes (30),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);
            var tokenString = tokenHandler.WriteToken (token);
            return tokenString;
        }
        private static void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            if (password == null) throw new ArgumentNullException ("password");
            if (string.IsNullOrWhiteSpace (password)) throw new ArgumentException ("value cannot be empty or whitespace, on string is allowed ", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }
        private static bool VerifyPasswordHash (string password, byte[] storedHash, byte[] storedSalt) {
            if (password == null) throw new ArgumentNullException ("password");
            if (string.IsNullOrWhiteSpace (password)) throw new ArgumentException ("value cannot be empty or whitespace, only string is allowed ", "password");
            if (storedHash.Length != 64) throw new ArgumentException ("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException ("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512 (storedSalt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }
            return true;
        }
    }
}