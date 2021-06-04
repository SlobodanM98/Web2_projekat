using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class Notification
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int NotificationID { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public NotificationType Type { get; set; }
		[Required]
		public bool IsRead { get; set; }
		[Required]
		public bool HasLink { get; set; }
		public string Link { get; set; }
		[Required]
		public DateTime Date { get; set; }
	}

	public enum NotificationType
	{
		Error,
		Info,
		Warning,
		Success
	}
}
