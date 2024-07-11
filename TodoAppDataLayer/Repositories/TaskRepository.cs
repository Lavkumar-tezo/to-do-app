using Microsoft.EntityFrameworkCore;
using TodoAppDataLayer.Interfaces;
using TodoAppDataLayer.Models;

namespace TodoAppDataLayer.Repositories
{
    public class TaskRepository(AppDbContext context) : Repository<UserTask>(context),ITaskRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<List<UserTask>> GetTasksByUserIdAsync(Guid userId)
        {
            return await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task<List<UserTask>> GetActiveTasksByUserIdAsync(Guid userId)
        {
            return await _context.Tasks.Where(t => t.UserId == userId && t.IsActive==true).ToListAsync();
        }

        public async Task<List<UserTask>> GetCompletedTasksByUserIdAsync(Guid userId)
        {
            return await _context.Tasks.Where(t => t.UserId == userId && t.IsActive == false).ToListAsync();
        }

        public async Task DeleteTasksAsync(Guid userId)
        {
            var entities = await _context.Tasks.Where(e => e.UserId==userId).ToListAsync();
            _context.RemoveRange(entities);
            await _context.SaveChangesAsync();
        }

    }
}
