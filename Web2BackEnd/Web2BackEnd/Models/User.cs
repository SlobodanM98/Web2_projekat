using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class User : IdentityUser
    {
        //[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public override string Id { get; set; }
		//[Required]
		//public override string UserName { get; set; }
		/*[Required]
		public string Password { get; set; }*/
		//[Required]
		//public override string Email { get; set; }
		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		public DateTime BirthDate { get; set; }
		[Required, ForeignKey("Address")]
		public int AddressID { get; set; }
		[Required]
		public Role Role { get; set; }
		[Required]
		public Status Status { get; set; }

		public ProductImage ProductImage { get; set; }

	}

	public enum Role
	{
		TeamMember,
		Dispatcher,
		Worker,
		Consumer,
		Admin
	}

	public enum Status
    {
		Accepted,
		Rejected,
		Processing
	}
}
