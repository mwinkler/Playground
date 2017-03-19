using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Frontend.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private DemoContext _demoCtx;

        public HomeController(DemoContext demoCtx)
        {
            _demoCtx = demoCtx;
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
            return _demoCtx.Users;
        }
    }
}
