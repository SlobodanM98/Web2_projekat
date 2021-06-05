using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options){ }
		public DbSet<Address> Addresses { get; set; }
		public DbSet<Consumer> Consumers { get; set; }
		public DbSet<Call> Calls { get; set; }
		public DbSet<Notification> Notifications { get; set; }
		public DbSet<Settings> Settings { get; set; }
	}
}
