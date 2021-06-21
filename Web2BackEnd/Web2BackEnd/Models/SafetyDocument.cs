using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class SafetyDocument : GenericModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        //[Required]
        public TipDokumenta tipDokumenta { get; set; }
       // [Required]

        
        public string Status { get; set; }
        //[Required]
        public int PlanRada { get; set; }
        //[Required]
        public string Author { get; set; }
        //[Required]
        public int Team { get; set; }
        //[Required]
        public string Details { get; set; }
        //[Required]
        public string Notes { get; set; }
        //[Required]
        public string PhoneNum { get; set; }
        //[Required]
        public string DateOfCreation { get; set; }
        public bool SafetyOp { get; set; }
        public bool tagsRemoved { get; set; }
        public bool groundingRemoved { get; set; }
        public bool readyForService { get; set; }


    }

    public enum TipDokumenta
    {
        PlaniraniRad,
        NeplaniraniRad
    }
}
