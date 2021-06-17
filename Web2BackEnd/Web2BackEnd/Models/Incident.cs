using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class Incident:GenericModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public IncidentType Tip { get; set; }
        
        public int? Prioritet { get; set; }
    
        public bool? Potvrdjen { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string ETA { get; set; }
        [Required]
        public string ATA { get; set; }
        [Required]
        public string VremeIncidenta { get; set; }
        [Required]
        public string ETR { get; set; }
        [Required]
        public float NivoNapona { get; set; }
        [Required]
        public string? PVR { get; set; }
        
        public string Uzrok { get; set; }
       
        public string Poduzrok { get; set; }
      
        public string Konstrukcija { get; set; }
        
        public string Materijal { get; set; }

        //public ICollection<Device> Devices { get; set; }
        //public ICollection<Call> Calls { get; set; }
        //public Team team { get; set; }
        

        

    }

    public enum IncidentType
    {
        PLANIRAN,
        NEPLANIRAN
    }
}
