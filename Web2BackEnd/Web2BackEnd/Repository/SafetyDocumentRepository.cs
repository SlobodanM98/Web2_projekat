using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class SafetyDocumentRepository : GenericRepository<SafetyDocument>, ISafetyDocumentRepository
    {
        public SafetyDocumentRepository(DataContext context) : base(context)
        {

        }

        public bool DocumentExists(int id)
        {
            return _context.Documents.Any(doc => doc.ID == id);
        }

        public override void Update(SafetyDocument model)
        {
            _context.Entry(model).State = EntityState.Modified;
            //_context.Entry(model.Team).State = EntityState.Modified;
        }
        public void AddImage(DocumentImage workPlanImage)
        {
            _context.DocumentImages.Add(workPlanImage);
            _context.Entry(workPlanImage.SafetyDocument).State = EntityState.Unchanged;
        }
        public async Task<IEnumerable<DocumentImage>> GetAllImages()
        {
            return await _context.DocumentImages.Include("SafetyDocument").ToListAsync();
        }

        


    }
}
