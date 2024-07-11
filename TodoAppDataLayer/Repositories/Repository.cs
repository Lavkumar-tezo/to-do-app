using Microsoft.EntityFrameworkCore;
using TodoAppDataLayer.Interfaces;

namespace TodoAppDataLayer.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<T> GetAsync(object id)
        {
            //T? t= await _context.Set<T>().FindAsync(id);
            //if(t == null)
            //{
            //    throw new Exception("Not found");
            //}
            //return t;
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            //_context.Set<T>().Update(entity);
            _context.Set<T>().Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        //public async Task UpdateAsync(T entity)
        //{
        //    try
        //    {
        //        _context.Set<T>().Update(entity);
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException ex)
        //    {
        //        Reload the entity from the database
        //        var entry = ex.Entries.Single();
        //        var databaseEntity = await _context.Set<T>().FindAsync(entry.Entity.GetType().GetProperty("Id").GetValue(entry.Entity, null));

        //        if (databaseEntity == null)
        //        {
        //            Handle the case where the entity was deleted
        //            throw new Exception("The entity you are trying to update has been deleted by another user.");
        //            }
        //        else
        //            {
        //                Get the current values from the database

        //               var databaseEntry = _context.Entry(databaseEntity);

        //                Decide how to handle the conflict
        //             For now, let's just overwrite the database values with the values from the current entity
        //            foreach (var property in entry.Metadata.GetProperties())
        //                {
        //                    var proposedValue = entry.Property(property.Name).CurrentValue;
        //                    var databaseValue = databaseEntry.Property(property.Name).CurrentValue;

        //                    Here, we can implement custom logic to merge values
        //                 For example, we could log the conflict or prompt the user to resolve it
        //                entry.Property(property.Name).CurrentValue = proposedValue;
        //                    databaseEntry.Property(property.Name).CurrentValue = proposedValue;
        //                }

        //                Retry the update operation
        //            await _context.SaveChangesAsync();
        //            }
        //        }
        //    }


        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity != null)
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }

}
