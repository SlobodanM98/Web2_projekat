using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOWorkPlanDevice
	{
		public int ID { get; set; }
		public Device Device { get; set; }
		public int WorkPlanID { get; set; }
	}
}
