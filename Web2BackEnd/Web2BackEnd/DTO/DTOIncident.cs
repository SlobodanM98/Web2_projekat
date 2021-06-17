using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
    public class DTOIncident
    {
        
        public int ID { get; set; }
        
        public Models.IncidentType Tip { get; set; }
        
        public int Prioritet { get; set; }
       
        public bool Potvrdjen { get; set; }
        
        public string Status { get; set; }
        
        public string ETA { get; set; }
        
        public string ATA { get; set; }
       
        public string VremeIncidenta { get; set; }
       
        public string ETR { get; set; }
        
        public float NivoNapona { get; set; }
       
        public string PVR { get; set; }
        
        public string Uzrok { get; set; }
        
        public string Poduzrok { get; set; }
        
        public string Konstrukcija { get; set; }
        
        public string Materijal { get; set; }
        //public ICollection<DTODevice> Devices { get; set; }
        //public ICollection<DTOCall> Calls { get; set; }
    }
}
