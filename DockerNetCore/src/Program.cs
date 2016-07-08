using System;
using Microsoft.AspNetCore.Hosting;

namespace DockerNetCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Starting webserver...");

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot("wwwroot")
                .UseStartup<Startup>()
                .UseUrls("http://0.0.0.0:5001")
                .Build();

            host.Run();
        }
    }
}
