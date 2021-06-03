using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
	 public interface ICallService
	{
		Task<IEnumerable<DTOCall>> GetCall();
		Task<DTOCall> GetCall(int id);
		Task<bool> UpdateCall(DTOCall call);
		Task<bool> AddCall(DTOCall call);
		Task<bool> DeleteCall(int id);
	}
}
