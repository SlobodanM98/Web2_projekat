using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOWorkPlanStatusHistory
	{
		public int WorkPlanStatusHistoryID { get; set; }
		public DateTime Date { get; set; }
		public string ChangedBy { get; set; }
		public WorkPlanStatus Status { get; set; }
		public int WorkPlanID { get; set; }
	}
}
