using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class Consumer : GenericModel
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ConsumerID { get; set; }
		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		public Address Address { get; set; }
		[Required]
		public int PhoneNumber { get; set; }
		[Required]
		public Type Type { get; set; }
		[Required]
		public int Priority { get; set; }
	}

	public enum Type{
		Residential,
		Commercial
	}
}
