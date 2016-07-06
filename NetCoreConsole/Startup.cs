
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.Run(ctx => ctx.Response.WriteAsync("Welcome AspNetCore!"));
    }
}