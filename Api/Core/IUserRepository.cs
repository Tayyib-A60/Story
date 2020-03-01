using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core.Models;

namespace Api.Core
{
    public interface IUserRepository
    {
         User Authenticate(UserToLogin userToLogin);
         Task<User> GetUser(int id);
         void CreateUser(User user, string password);
         Task<bool> UserExists(User user);
         string CreateToken(User user);
         Task<bool> SaveAllChanges();
         void SendEmail(Message message);
         Task<IEnumerable<User>> GetAdminUsers();
    }
}