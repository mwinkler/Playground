using Microsoft.AspNetCore.Mvc;

namespace DockerNetCore.Controllers
{
    [Route("")]
    [Route("Home")]
    public class HomeController : Controller
    {
        // public HomeController(IHostingEnvironment env)
        // {

        // }

        public IActionResult Index()
        {
            return View();
        }
    }
}
