using Microsoft.EntityFrameworkCore;
using Api.Core.Models;

namespace Api.Persistence
{
    public class DataContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DataContext (DbContextOptions<DataContext> options) : base (options) {}
    }
}