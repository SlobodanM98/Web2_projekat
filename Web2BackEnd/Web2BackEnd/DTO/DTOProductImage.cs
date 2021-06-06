using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
    public class DTOProductImage
    {
        public int ProductId { get; set; }

        public string ImagePath { get; set; }

        public byte[] Image { get; set; }
    }
}
