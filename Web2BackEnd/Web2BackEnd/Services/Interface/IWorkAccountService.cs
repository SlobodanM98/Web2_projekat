using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface IWorkAccountService
    {
        Task<IEnumerable<DTOWorkAccount>> GetWorkAccount();
        Task<DTOWorkAccount> GetWorkAccount(int id);
        Task<bool> UpdateWorkAccount(DTOWorkAccount workAccount);
        Task<bool> AddWorkAccount(DTOWorkAccount workAccount);
        Task<bool> DeleteWorkAccount(int id);
    }
}
