using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class DeviceRepository : GenericRepository<Device>, IDeviceRepository
    {
        public DeviceRepository(DataContext context) : base(context)
        {

        }

        public bool DeviceExists(int id)
        {
            return _context.Devices.Any(device => device.ID == id);
        }

		public override async Task<IEnumerable<Device>> GetAll()
		{
			return await _dbSet.Include("Address").ToListAsync();
		}

		public override void Update(Device model)
		{
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
		}

		public override async Task<Device> Get(int id)
		{
			return await _dbSet.Include("Address").FirstOrDefaultAsync(device => device.ID == id);
		}

		public override void Add(Device model)
		{
			_dbSet.Add(model);
			_context.Entry(model.Address).State = EntityState.Unchanged;
		}
	}
}
