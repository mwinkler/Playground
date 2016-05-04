using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Console.WriteLine("Hello World!");
            
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseWebRoot("wwwroot")
                .UseStartup<Startup>()
                .Build();
            
            host.Run();
        }
    }
}
