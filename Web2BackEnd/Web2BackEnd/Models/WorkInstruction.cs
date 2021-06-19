using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class WorkInstruction
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int InstructionID { get; set; }
		[Required]
		public Device Device { get; set; }
		[Required]
		public string Description { get; set; }
		[Required]
		public InstructionStatus Status { get; set; }
		[Required]
		public int WorkPlanID { get; set; }
	}

	public enum InstructionStatus
	{
		Executed,
		Unexecuted
	}
}
