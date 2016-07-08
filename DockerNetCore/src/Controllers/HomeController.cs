using Microsoft.AspNetCore.Mvc;

namespace DockerNetCore.Controllers
{
    [Route("")]
    [Route("Home")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
