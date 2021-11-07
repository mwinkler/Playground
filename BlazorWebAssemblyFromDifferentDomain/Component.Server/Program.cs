
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(config => config.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();

app.Run();
