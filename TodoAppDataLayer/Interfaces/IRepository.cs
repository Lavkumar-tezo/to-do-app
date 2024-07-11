namespace TodoAppDataLayer.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetAsync(object id);

        Task<List<T>> GetAllAsync();

        Task AddAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(int id);
    }
}
