using System;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
>>>>>>> 1a3d8ed6652d7f0aa20911d1549ed04d0e8a4282

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
<<<<<<< HEAD
            Console.WriteLine("Hello World!");
=======
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .UseUrls("http://*:5000")
                .Build();

            host.Run();
>>>>>>> 1a3d8ed6652d7f0aa20911d1549ed04d0e8a4282
        }
    }
}
