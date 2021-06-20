using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;
using Web2BackEnd.Services.Interface;

namespace Web2BackEnd.Services
{
    public class WorkAccountService : IWorkAccountService
    {
        private readonly WorkAccountRepository _workAccountRepository;
        private readonly IMapper _mapper;

        public WorkAccountService(DataContext context, IMapper mapper)
        {
            this._workAccountRepository = new WorkAccountRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddWorkAccount(DTOWorkAccount workAccount)
        {
            WorkAccount mapWorkAccount = _mapper.Map<WorkAccount>(workAccount);
            _workAccountRepository.Add(mapWorkAccount);
            bool success = true;

            try
            {
                await _workAccountRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public async Task<bool> DeleteWorkAccount(int id)
        {
            WorkAccount workAccount = await _workAccountRepository.Delete(id);

            if (workAccount == null)
            {
                return false;
            }
            else
            {
                await _workAccountRepository.SaveChanges();
                return true;
            }
        }

        public async Task<IEnumerable<DTOWorkAccount>> GetWorkAccount()
        {
            IEnumerable<WorkAccount> workAccounts = await _workAccountRepository.GetAll();
            return _mapper.Map<IEnumerable<DTOWorkAccount>>(workAccounts);
        }

        public async Task<DTOWorkAccount> GetWorkAccount(int id)
        {
            WorkAccount workAccount = await _workAccountRepository.Get(id);
            return _mapper.Map<DTOWorkAccount>(workAccount);
        }

        public async Task<bool> UpdateWorkAccount(DTOWorkAccount workAccount)
        {
            WorkAccount mapWorkAccount = _mapper.Map<WorkAccount>(workAccount);
            await _workAccountRepository.Update2(mapWorkAccount);

            bool success = true;

            try
            {
                await _workAccountRepository.SaveChanges();
            }
            catch(Exception e)
            {
                if (!_workAccountRepository.WorkAccountExists(workAccount.WorkAccountID))
                {
                    success = false;
                }
                else
                {
                    throw;
                }
            }

            return success;
        }
    }
}
