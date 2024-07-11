using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;

namespace TodoAppServices.Interfaces
{
    public interface IUserProvider
    {
        public Task AddUserAsync(UserDTO userDTO,Guid id);

        public Task<List<User>> GetUsersAsync();

        Task<Guid> ValidateUser(UserDTO dto, bool isLogin);

    }
}
