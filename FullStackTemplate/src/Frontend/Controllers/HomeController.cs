using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Microsoft.Extensions.Logging;

namespace Frontend.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private DemoContext _demoCtx;
        private ILogger<HomeController> _log;

        public HomeController(DemoContext demoCtx, ILogger<HomeController> log)
        {
            _demoCtx = demoCtx;
            _log = log;
        }

        [Route("")]
        public string Index()
        {
            return "Hello World!";
        }

        [HttpGet]
        [Route("Users")]
        public IEnumerable<User> Users()
        {
            _log.LogDebug("User API");

            return _demoCtx.Users;
        }
    }
}
