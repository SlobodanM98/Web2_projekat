using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class WorkAccountImage
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WorkAccountImageID { get; set; }
        [Required]
        public int ImageID { get; set; }
        [Required]
        public int WorkAccountID { get; set; }
    }
}
