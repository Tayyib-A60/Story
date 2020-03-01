using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Api.Core.Models;

namespace Api.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        public bool EmailVerified { get; set; }
        public Role Role { get; set; }
        public ICollection<Story> Stories { get; set; }
        public User()
        {
            this.Stories = new Collection<Story>();
        }
    }
}