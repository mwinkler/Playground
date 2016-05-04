using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace ConsoleApplication
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }
        
        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            
            app.Map("/mvc", mvcapp => {
                mvcapp.UseMvcWithDefaultRoute();
            });
            
            app.Run(context => context.Response.WriteAsync("End of the pipeline."));
        }
    }
}