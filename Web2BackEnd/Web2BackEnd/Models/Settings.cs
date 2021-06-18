using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
	public class Settings
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int settingsID { get; set; }
		[Required]
		public bool successEnabled { get; set; }
		[Required]
		public bool errorEnabled { get; set; }
		[Required]
		public bool infoEnabled { get; set; }
		[Required]
		public bool warningEnabled { get; set; }
		[Required]
		public bool showFields { get; set; }
		[Required]
		public string teamIcon { get; set; }
		[Required]
		public string incidentIcon { get; set; }
		[Required]
		public string callIcon { get; set; }
	}
}
