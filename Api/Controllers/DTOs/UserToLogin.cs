namespace Api.Controllers.DTOs
{
    public class UserToLogin {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
    }
}