using Microsoft.Identity.Client;
using TodoAppDataLayer.Interfaces;
using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;
using TodoAppServices.Interfaces;

namespace TodoAppServices.Providers
{
    public class TaskProvider(ITaskRepository taskRepository) : ITaskProvider
    {
        private readonly ITaskRepository _taskRepository = taskRepository;

        public async Task AddTaskAsync(TaskDTO taskDTO, Guid userId)
        {
            UserTask newTask = new()
            {
                Title=taskDTO.Title,
                Description=taskDTO.Description,
                IsActive=true,
                UserId=userId,
                CreatedOn=DateTime.Now,
            };
            await _taskRepository.AddAsync(newTask);
        }

        public async Task DeleteTaskAsync(int id)
        {
            await _taskRepository.DeleteAsync(id);
        }

        public async Task<List<UserTask>> GetActiveTasksAsync(Guid id)
        {
            return await _taskRepository.GetActiveTasksByUserIdAsync(id);
        }

        public async Task<List<UserTask>> GetCompletedTasksAsync(Guid id)
        {
            return await _taskRepository.GetCompletedTasksByUserIdAsync(id);
        }

        public async Task<List<UserTask>> GetTasksAsync(Guid userId)
        {
            return await _taskRepository.GetTasksByUserIdAsync(userId);
        }

        public async Task<UserTask> GetTaskByIdAsync(int id)
        {
            return await _taskRepository.GetAsync(id);
        }

        public async Task UpdateTaskAsync(TaskDTO taskDTO)
        {
            UserTask task = await  _taskRepository.GetAsync(taskDTO.Id!);
            if(task is not null)
            {
                task.Title = taskDTO.Title;
                task.Description = taskDTO.Description;
                await _taskRepository.UpdateAsync(task);
            }
            else
            {
                throw new Exception("Id does not exist");
            }
        }

        public  async Task ChangeTaskStatusAsync(int id)
        {
            UserTask task = await _taskRepository.GetAsync(id);
            if (task is not null)
            {
                task.IsActive= !task.IsActive;
                await _taskRepository.UpdateAsync(task);
            }
            else
            {
                throw new Exception("Id does not exist");
            }
        }

        public async Task DeleteAllTasksAsync(Guid guid)
        {
            await _taskRepository.DeleteTasksAsync(guid);
        }
    }
}
