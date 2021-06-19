using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOWorkInstruction
	{
		public int InstructionID { get; set; }
		public Device Device { get; set; }
		public string Description { get; set; }
		public InstructionStatus Status { get; set; }
		public int WorkPlanID { get; set; }
	}
}
