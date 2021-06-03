using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class Call : GenericModel
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int CallID { get; set; }
		[Required]
		public Reason Reason { get; set; }
		public string Comment { get; set; }
		[Required]
		public int Priority { get; set; }
		[Required]
		public Address Address { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}

	public enum Reason
	{
		NemaStruje,
		PostojiKvar,
		TreperenjeSvetla,
		PovratakStruje,
		DelimicnaStruja,
		ProblemiSNaponom
	}
}
