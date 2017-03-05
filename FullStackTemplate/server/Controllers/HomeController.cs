using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [Route("")]
        public string Index()
        {
            return "Hello World!";
        }

        [HttpGet]
        [Route("Users")]
        public IEnumerable<object> Users()
        {
            return new[]
            {
                new { Id = 1, Name = "User 1" },
                new { Id = 2, Name = "User 2 "}
            };
        }
    }
}
