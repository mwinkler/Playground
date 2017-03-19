using System;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class DemoContext : DbContext
    {
        public DemoContext(DbContextOptions<DemoContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
    }
}
