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
		public DbSet<Incident> Incidents { get; set; }
		public DbSet<SafetyDocument> Documents { get; set; }
		public DbSet<Device> Devices { get; set; }
		public DbSet<Team> Teams { get; set; }
		public DbSet<TeamUser> TeamUsers { get; set; }
		public DbSet<IncidentDevice> IncidentDevices { get; set; }
		public DbSet<IncidentCall> IncidentCalls { get; set; }

		public DbSet<DocumentDevice> DocumentDevices { get; set; }

		public DbSet<IncidentImage> IncidentImages { get; set; }
		public DbSet<DocumentImage> DocumentImages { get; set; }

	}
}
