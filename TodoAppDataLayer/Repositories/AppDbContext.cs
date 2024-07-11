using Microsoft.EntityFrameworkCore;
using TodoAppDataLayer.Models;

namespace TodoAppDataLayer.Repositories
{
    public class AppDbContext:DbContext
    {
        public AppDbContext()
        {

        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasAlternateKey(user => user.Name);
            modelBuilder.Entity<User>().HasMany(u => u.Tasks).WithOne(ut => ut.User).HasForeignKey(ut => ut.UserId).OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserTask> Tasks { get; set; }
    }
}
