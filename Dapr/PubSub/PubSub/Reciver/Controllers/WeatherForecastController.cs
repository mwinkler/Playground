using Dapr;
using Microsoft.AspNetCore.Mvc;

namespace Reciver.Controllers
{
    [ApiController]
    public class CheckoutServiceController : Controller
    {
        //Subscribe to a topic 
        [Topic("order-pub-sub", "orders")]
        [HttpPost("checkout")]
        public void getCheckout([FromBody] int orderId)
        {
            Console.WriteLine("Subscriber received : " + orderId);
        }
    }
}