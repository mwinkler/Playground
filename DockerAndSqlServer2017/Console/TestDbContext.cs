using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace DockerAndEf
{
    public class TestDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public TestDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.ID);
        }
    }
}
