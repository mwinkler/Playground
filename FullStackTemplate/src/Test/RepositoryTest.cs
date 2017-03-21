using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repository;
using GenFu;

namespace Test
{
    [TestClass]
    public class RepositoryTest
    {
        [TestMethod]
        public void Repository_Init()
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var optionsBuilder = new DbContextOptionsBuilder<DemoContext>().UseSqlServer(configuration.GetConnectionString("DemoConnection"));

            using (var ctx = new DemoContext(optionsBuilder.Options))
            {
                ctx.Database.EnsureDeleted();
                ctx.Database.EnsureCreated();

                // seed some users
                A.Configure<User>()
                    .Fill(u => u.Id).WithinRange(0, 0)
                    .Fill(u => u.Name).AsFirstName()
                    .Fill(u => u.Mail).AsEmailAddress();

                ctx.Users.AddRange(A.ListOf<User>(25));

                ctx.SaveChanges();
            }
        }
    }
}
