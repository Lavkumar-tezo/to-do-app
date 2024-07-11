using AutoMapper;
using TodoAppDataLayer.Models;
using TodoAppServices.DTOs;

namespace TodoAppServices.Helper
{
    public class AutoMapper:Profile
    {
        public AutoMapper() {
            CreateMap<UserTask, TaskDTO>();
        }
    }
}
