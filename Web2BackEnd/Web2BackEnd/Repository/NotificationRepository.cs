using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
	public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
	{
		public NotificationRepository(DataContext context) : base(context) { }

		public bool NotificationExists(int id)
		{
			return _context.Notifications.Any(notification => notification.NotificationID == id);
		}
	}
}
