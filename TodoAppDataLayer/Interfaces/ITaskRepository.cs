using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoAppDataLayer.Models;

namespace TodoAppDataLayer.Interfaces
{
    public interface ITaskRepository:IRepository<UserTask>
    {
        public Task<List<UserTask>> GetTasksByUserIdAsync(Guid userId);

        public Task<List<UserTask>> GetActiveTasksByUserIdAsync(Guid userId);

        public Task<List<UserTask>> GetCompletedTasksByUserIdAsync(Guid userId);

        public Task DeleteTasksAsync(Guid id);

    }
}
