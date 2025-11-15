#!/usr/bin/dotnet run
#:sdk Microsoft.NET.Sdk.Web
#:property ContainerRepository=MyHelloWorld

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, World!");
app.Run();