using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class WorkAccount
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WorkAccountID { get; set; }

        [Required]
        public TypeWorkAccount Type { get; set; }
        [Required]
        public StatusWorkAccount Status { get; set; }
        [Required]
        public int IncidentID { get; set; }
        [Required]
        public Address Address { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string Created { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        [Required]
        public string Purpose { get; set; }
        [Required]
        public string Notes { get; set; }
        [Required]
        public bool UrgentWork { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        public WorkAccountStatusHistory WorkAccountStatusHistory { get; set; }



    }

    public enum TypeWorkAccount
    {
        PlannedWork,
        UnplannedWork
    }

    public enum StatusWorkAccount
    {
        Draft,
        Approved,
        Denied,
        Canceled
    }
}
