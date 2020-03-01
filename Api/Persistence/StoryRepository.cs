using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core;
using Api.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Api.Persistence
{
    public class StoryRepository : IStoryRepository
    {
        private DataContext _context { get; }
        public IConfiguration _configuration { get; }

        public StoryRepository(DataContext context, IConfiguration configuration) {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Story> GetStory(bool isAdmin,int userId, int storyId)
        {
            var story = new Story();
            if(isAdmin) {
                story = await _context.Stories.FirstOrDefaultAsync(st => st.ReviewerId == userId && st.StoryId == storyId);
            }
            else {
                story = await _context.Stories.FirstOrDefaultAsync(st => st.UserId == userId && st.StoryId == storyId);
            }
            return story;
        }
        public async Task<IEnumerable<Story>> GetStories(bool isAdmin, int userId)
        {
            if(isAdmin) {
                return await _context.Stories.Where(st => st.ReviewerId == userId)
                                             .ToListAsync();
            } else {
                return await _context.Stories.Where(st => st.UserId == userId)
                                             .ToListAsync();
            }
        }

        public void Add<T>(T entity) where T: class
        {
            _context.Entry(entity).State = EntityState.Added;
        }

        public void Update<T>(T entity) where T: class
        {
            _context.Entry(entity).State = EntityState.Modified;
        }
        public async Task<bool> SaveAllChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}