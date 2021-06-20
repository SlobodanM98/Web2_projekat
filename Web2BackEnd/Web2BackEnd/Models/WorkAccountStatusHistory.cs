using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class WorkAccountStatusHistory
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WorkAccountStatusHistoryID { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string ChangedBy { get; set; }

        [Required]
        public StatusWorkAccount Status { get; set; }
    }
}
