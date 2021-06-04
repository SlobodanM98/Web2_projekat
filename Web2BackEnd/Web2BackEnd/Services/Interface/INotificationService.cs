using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
	public interface INotificationService
	{
		Task<IEnumerable<DTONotification>> GetNotification();
		Task<DTONotification> GetNotification(int id);
		Task<bool> UpdateNotification(DTONotification notification);
		Task<bool> AddNotification(DTONotification notification);
		Task<bool> DeleteNotification(int id);
	}
}
