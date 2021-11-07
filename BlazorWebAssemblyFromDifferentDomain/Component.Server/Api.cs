using Microsoft.AspNetCore.Mvc;
using Shared;

namespace Component.Server
{
    [ApiController]
    [Route("/api/weather")]
    public class Api : ControllerBase
    {
        private static readonly string[] Summaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };

        [HttpGet]
        public IEnumerable<WeatherForecast> Get() => Enumerable.Range(1, 5)
            .Select(index => new WeatherForecast(
                DateTime.Now.AddDays(index),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]
            ))
            .ToArray();
    }
}
