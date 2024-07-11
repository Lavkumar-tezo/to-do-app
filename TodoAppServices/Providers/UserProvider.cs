using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoAppDataLayer.Interfaces;
using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;
using TodoAppServices.Interfaces;

namespace TodoAppServices.Providers
{
    public class UserProvider(IRepository<User> repository) : IUserProvider
    {
        private readonly IRepository<User> _repository = repository;

        public async Task AddUserAsync(UserDTO userDTO, Guid id)
        {
            User newUser = new()
            {
                Id = id,
                Name = userDTO.Name,
                Password = userDTO.Password
            };
            await _repository.AddAsync(newUser);
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Guid> ValidateUser(UserDTO dto,bool isLogin)
        {
            List<User> users = await _repository.GetAllAsync();
            User? user = users.FirstOrDefault(emp => string.Equals(dto.Name.ToLower(), emp.Name.ToLower()) && string.Equals(dto.Password.ToLower(), emp.Password.ToLower()));
            if (user == null)
            {
                if (isLogin) throw new Exception("User not found");
                var userId = Guid.NewGuid();
                await AddUserAsync(dto, userId);
                return userId;
            }
            if (!isLogin) throw new Exception("User already exists");
            return user.Id;
        }

    }

}
