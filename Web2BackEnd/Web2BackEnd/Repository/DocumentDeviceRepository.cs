using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository
{
    public class DocumentDeviceRepository : GenericRepository<DocumentDevice>
    {

        public DocumentDeviceRepository(DataContext context) : base(context) { }
        public async Task<IEnumerable<DocumentDevice>> getAll(int id)
        {
            List<DocumentDevice> documentDevices = await _dbSet.ToListAsync();
            return documentDevices.FindAll(x => x.DocumentID == id);
        }

        public override void Update(DocumentDevice model)
        {
            _context.Entry(model).State = EntityState.Modified;
        }

        public override async Task<DocumentDevice> Get(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(x =>x.ID == id);
        }

        public override void Add(DocumentDevice model)
        {
            _dbSet.Add(model);

        }

    }
}
