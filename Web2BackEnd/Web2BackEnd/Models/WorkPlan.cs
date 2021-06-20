using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class WorkPlan : GenericModel
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int WorkPlanID { get; set; }
		[Required]
		public WorkPlanType Type { get; set; }
		[Required]
		public WorkPlanStatus Status { get; set; }
		[Required]
		public Address Address { get; set; }
		[Required]
		public string CreatedBy { get; set; }
		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		[Required]
		public string Purpose { get; set; }
		public string Notes { get; set; }
		[Required]
		public string Company { get; set; }
		[Required]
		public int Phone { get; set; }
		[Required]
		public DateTime CreationDate { get; set; }
		[Required, ForeignKey("Device")]
		public int DeviceID { get; set; }
	}

	public enum WorkPlanType
	{
		Planned,
		Unplanned
	}

	public enum WorkPlanStatus
	{
		Draft,
		Approved,
		Denied,
		Canceled,
		Finished
	}
}
