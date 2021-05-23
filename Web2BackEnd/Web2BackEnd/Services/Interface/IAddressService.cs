using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;

namespace Web2BackEnd.Services.Interface
{
	public interface IAddressService
	{
		Task<IEnumerable<DTOAddress>> GetAddress();
		Task<DTOAddress> GetAddress(int id);
		Task<bool> UpdateAddress(DTOAddress address);
		Task<bool> AddAddress(DTOAddress address);
		Task<bool> DeleteAddress(int id);
	}
}
