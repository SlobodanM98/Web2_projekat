using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
	public interface IConsumerService
	{
		Task<IEnumerable<DTOConsumer>> GetConsumer();
		Task<DTOConsumer> GetConsumer(int id);
		Task<bool> UpdateConsumer(DTOConsumer consumer);
		Task<bool> AddConsumer(DTOConsumer consumer);
		Task<bool> DeleteConsumer(int id);
	}
}
