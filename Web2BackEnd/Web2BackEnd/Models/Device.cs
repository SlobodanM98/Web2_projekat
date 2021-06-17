using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class Device : GenericModel
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public DeviceType Type { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Address Address { get; set; }
        [Required]
        public float LongCoord { get; set; }
        [Required]
        public float LatCoord { get; set; }

    }

    public enum DeviceType
    {
        Prekidac,
        Osigurac,
        Transformator,
        Diskonektor
    }
}
