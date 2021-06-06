using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
    public class UserForRegistrationDto
    {
        public string Id { get; set; }
        //public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        //[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        //public string ConfirmPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        public int AddressID { get; set; }

        public Models.Role Role { get; set; }

        public IFormFile SelecetdFile { get; set; }
        public DTOProductImage Image { get; set; }
    }
}
