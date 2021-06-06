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

    }
}
