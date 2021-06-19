using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOWorkPlan
	{
		public int WorkPlanID { get; set; }
		public WorkPlanType Type { get; set; }
		public WorkPlanStatus Status { get; set; }
		public Address Address { get; set; }
		public string CreatedBy { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Purpose { get; set; }
		public string Notes { get; set; }
		public string Company { get; set; }
		public int Phone { get; set; }
		public DateTime CreationDate { get; set; }
		public int DeviceID { get; set; }
	}
}
