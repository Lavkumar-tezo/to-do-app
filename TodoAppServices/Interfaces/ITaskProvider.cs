using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;

namespace TodoAppServices.Interfaces
{
    public interface ITaskProvider
    {
        public Task AddTaskAsync(TaskDTO taskDTO,Guid userId);

        public Task DeleteTaskAsync(int id);

        public Task<List<UserTask>> GetActiveTasksAsync(Guid id);

        public Task<List<UserTask>> GetCompletedTasksAsync(Guid id);

        public Task<UserTask> GetTaskByIdAsync(int id);

        public Task UpdateTaskAsync(TaskDTO taskDTO);

        public Task ChangeTaskStatusAsync(int id);

        public Task<List<UserTask>> GetTasksAsync(Guid userId);

        public Task DeleteAllTasksAsync(Guid userId);
    }
}
