using Component;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddScoped(sp => new HttpClient() { BaseAddress = new Uri("https://localhost:7070"/*builder.HostEnvironment.BaseAddress*/) });

builder.RootComponents.RegisterAsCustomElement<Counter>("my-counter");
builder.RootComponents.RegisterAsCustomElement<FetchData>("my-fetchdata");

await builder.Build().RunAsync();
