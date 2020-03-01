using System.Collections.Generic;
using System.Collections.ObjectModel;
using Api.Core.Models;

namespace Api.Controllers.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public bool EmailVerified { get; set; }
        public ICollection<Story> Stories { get; set; }
        public UserDTO()
        {
            this.Stories = new Collection<Story>();
        }
    }
}