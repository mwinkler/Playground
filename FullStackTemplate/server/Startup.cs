using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Server
{
    public class Startup
    {
        // Load application settings from JSON file(s)
        // https://docs.asp.net/en/latest/fundamentals/configuration.html
        public Startup(IHostingEnvironment env)
        {
            // Configuration = new ConfigurationBuilder()
            //     .SetBasePath(env.ContentRootPath)
            //     .AddJsonFile($"appsettings.json", optional: true)
            //     .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            //     .Build();
        }

        public IConfiguration Configuration { get; set; }

        // Configure IoC container
        // https://docs.asp.net/en/latest/fundamentals/dependency-injection.html
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvcCore()
                //.AddAuthorization()
                //.AddViews()
                //.AddRazorViewEngine()
                .AddJsonFormatters()
                ;
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory factory)
        {
            // Configure logging
            // https://docs.asp.net/en/latest/fundamentals/logging.html
            // factory.AddConsole(Configuration.GetSection("Logging"));
            // factory.AddDebug();

            // Serve static files
            // https://docs.asp.net/en/latest/fundamentals/static-files.html
            app.UseStaticFiles();

            // Configure ASP.NET MVC
            // https://docs.asp.net/en/latest/mvc/index.html
            app.UseMvc(routes =>
            {
                //routes.MapRoute("default", "{*url}", new { controller = "Home", action = "Index" });
            });
        }

        public static void Main()
        {
            // var cwd = Directory.GetCurrentDirectory();
            // var web = Path.GetFileName(cwd) == "server" ? "../public" : "public";

            var host = new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseWebRoot("build")
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
