using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface IUserService
    {
        Task<bool> Register(UserForRegistrationDto model);

        Task<bool> DeleteUser(string id);

        Task<string> GenerateToken(UserForRegistrationDto model);

        Task<bool> ConfirmeToken(string email, string token);

        Task<IEnumerable<UserForRegistrationDto>> GetUsers();

        Task<UserForRegistrationDto> GetUser(string id);

        Task<IEnumerable<UserForRegistrationDto>> GetUsersEmailCofirm();

        Task<bool> UpdateStatus(UserForRegistrationDto model);

        Task<bool> UpdateUser(UserForRegistrationDto user);

        Task<bool> UpdateUserPassword(UserForRegistrationDto user);
    }
}
