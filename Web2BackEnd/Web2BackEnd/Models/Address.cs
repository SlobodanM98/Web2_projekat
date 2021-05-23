using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class Address : GenericModel
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[ForeignKey("Consumer")]
		public int AddressID { get; set; }
		[Required]
		public string Street { get; set; }
		[Required]
		public int Number { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public int PostalNumber { get; set; }
		[Required]
		public int Priority { get; set; }
	}
}
