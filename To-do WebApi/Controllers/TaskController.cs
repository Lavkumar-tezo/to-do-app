using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;
using TodoAppServices.Interfaces;

namespace To_do_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController(ITaskProvider provider,IMapper mapper) : ControllerBase
    {
        private readonly ITaskProvider _provider =provider;
        private readonly IMapper _mapper = mapper;

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetAllTask()
        {
            try
            {
                var claim = User.Claims.First(claim =>  string.Equals(claim.Type.ToLower(),"id")).Value;
                Guid guid = new(claim);
                List<UserTask> tasks =await  _provider.GetTasksAsync(guid);
                List<TaskDTO> taskDTOs = _mapper.Map<List<TaskDTO>>(tasks);
                return Ok(taskDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetActiveTasks()
        {
            try
            {
                var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
                Guid guid = new(claim);
                List<UserTask> tasks = await _provider.GetActiveTasksAsync(guid);
                List<TaskDTO> taskDTOs = _mapper.Map<List<TaskDTO>>(tasks);
                return Ok(taskDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetCompletedTasks()
        {
            try
            {
                var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
                Guid guid = new(claim);
                List<UserTask> tasks = await _provider.GetCompletedTasksAsync(guid);
                List<TaskDTO> taskDTOs = _mapper.Map<List<TaskDTO>>(tasks);
                return Ok(taskDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetTask(int id)
        {
            try
            {
                var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
                Guid guid = new(claim);
                UserTask tasks = await _provider.GetTaskByIdAsync(id);
                TaskDTO taskDTOs = _mapper.Map<TaskDTO>(tasks);
                return Ok(taskDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TaskDTO dto)
        {
            try
            {
                var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
                Guid guid = new(claim);
                await _provider.AddTaskAsync(dto,guid);
                return Ok("Task Added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> UpdateTask([FromBody] TaskDTO dto)
        {
            try
            {
                await _provider.UpdateTaskAsync(dto);
                return Ok("Task Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> UpdateTaskStatus(int id)
        {
            try
            {
                await _provider.ChangeTaskStatusAsync(id);
                return Ok("Task Status Changed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                await _provider.DeleteTaskAsync(id);
                return Ok("Task Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAllTask()
        {
            var claim = User.Claims.First(claim => string.Equals(claim.Type.ToLower(), "id")).Value;
            Guid guid = new(claim);
            await _provider.DeleteAllTasksAsync(guid);
            return Ok("All selected tasks deleted");
        }


    }
}
