using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core
{
    public interface IStoryRepository
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        Task<Story> GetStory(bool isAdmin, int userId, int storyId);
        Task<IEnumerable<Story>> GetStories(bool isAdmin, int userId);
        Task<bool> SaveAllChanges();
    }
}