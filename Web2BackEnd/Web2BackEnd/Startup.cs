using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.AutoMapper;
using Web2BackEnd.Data;
using AutoMapper;
using Web2BackEnd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Web2BackEnd
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();

			services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DataContext")));
			services.AddDbContext<ApplicationUserContext>(options => options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection")));
			//services.AddDefaultIdentity<User>().AddEntityFrameworkStores<ApplicationUserContext>().AddDefaultTokenProviders();
			services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ApplicationUserContext>().AddDefaultTokenProviders();

			services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

			services.AddCors(options => options.AddDefaultPolicy(builder => { 
				builder.AllowAnyOrigin();
				builder.AllowAnyMethod();
				builder.AllowAnyHeader();
			}));

			services.Configure<IdentityOptions>(opts =>
			{
				opts.User.RequireUniqueEmail = true;
				opts.Password.RequiredLength = 8;

				opts.SignIn.RequireConfirmedEmail = true;
			});

			services.Configure<FormOptions>(o =>
			{
				o.ValueLengthLimit = int.MaxValue;
				o.MultipartBodyLengthLimit = int.MaxValue;
				o.MemoryBufferThreshold = int.MaxValue;
			});


			//JWT auth
			

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors();

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseStaticFiles();
			/*app.UseStaticFiles(new StaticFileOptions
			{
				FileProvider = new PhysicalFileProvider(ConfigurationPath.Combine(Directory.GetCurrentDirectory(), @"StaticFiles")),
				RequestPath = new Microsoft.AspNetCore.Http.PathString("/StaticFiles")
			});*/

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
