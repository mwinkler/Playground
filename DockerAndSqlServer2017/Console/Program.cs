using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DockerAndEf
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .Build();

            var ctx = new TestDbContext(new DbContextOptionsBuilder()
                .UseSqlServer($@"Server=sqlserver;Database=Test;AttachDbFilename=/var/db/test.mdf;User Id=sa;Password={config["SA_PASSWORD"]};")
                .Options);

            // create db
            ctx.Database.EnsureCreated();

            // add data
            ctx.Users.Add(new User { Account = "Test", Name = "TestAccount" });
            ctx.SaveChanges();

            Console.WriteLine($"Found {ctx.Users.Count()} accounts");

            ctx.Users.ToList().ForEach(u => Console.WriteLine($"{u.ID} {u.Name}"));

            Console.WriteLine("Finish");
        }
    }
}
