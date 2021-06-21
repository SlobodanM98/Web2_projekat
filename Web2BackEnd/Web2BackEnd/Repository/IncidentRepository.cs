using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class IncidentRepository : GenericRepository<Incident>, IIncidentRepository
    {
        public IncidentRepository(DataContext context):base(context) { }

        public bool IncidentExists(int id)
        {
            return _context.Incidents.Any(inc => inc.ID == id);
        }

		public override async Task<IEnumerable<Incident>> GetAll()
		{
			return await _dbSet.Include("Team").ToListAsync();
		}

		public override void Update(Incident model)
		{
			_context.Entry(model).State = EntityState.Modified;
			if (model.Team != null)
			{
				//	_context.Entry(model.Team).State = EntityState.Unchanged;
				_context.Entry(model.Team).State = EntityState.Modified;
			}
			
		}

		public override async Task<Incident> Get(int id)
		{
			return await _dbSet.Include("Team").FirstOrDefaultAsync(incident => incident.ID == id);
		}

		public void AddImage(IncidentImage incidentImage)
		{
			_context.IncidentImages.Add(incidentImage);
			_context.Entry(incidentImage.Incident).State = EntityState.Unchanged;
		}
		public async Task<IEnumerable<IncidentImage>> GetAllImages()
		{
			return await _context.IncidentImages.Include("Incident").ToListAsync();
		}

		/*
		public override void Add(Incident model)
		{

			_dbSet.Add(model);
			_context.Entry(model.Team).State = EntityState.Unchanged;
		}*/
	}
}
