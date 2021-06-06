using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.Data
{
    // Add-Migration UserUpdate -Context ApplicationUserContext
    // Update-DataBase -Context ApplicationUserContext
    public class ApplicationUserContext : IdentityDbContext
    {
        public ApplicationUserContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
