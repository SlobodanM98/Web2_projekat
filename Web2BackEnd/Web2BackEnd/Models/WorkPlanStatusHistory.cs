using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class WorkPlanStatusHistory
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int WorkPlanStatusHistoryID { get; set; }
		[Required]
		public DateTime Date { get; set; }
		[Required]
		public string ChangedBy { get; set; }
		[Required]
		public WorkPlanStatus Status { get; set; }
		[Required]
		public int WorkPlanID { get; set; }
	}
}
