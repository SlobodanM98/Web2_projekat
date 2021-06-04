using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTONotification
	{
		public int NotificationID { get; set; }
		public string Description { get; set; }
		public NotificationType Type { get; set; }
		public bool IsRead { get; set; }
		public bool HasLink { get; set; }
		public string Link { get; set; }
		public DateTime Date { get; set; }
	}
}
