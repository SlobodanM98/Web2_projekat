using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class DocumentImage
    {
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ID { get; set; }
		[Required]
		public string ImagePath { get; set; }
		[Required]
		public byte[] Image { get; set; }
		[Required]
		public SafetyDocument SafetyDocument { get; set; }
	}
}
