using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UI.Shared;

namespace UI.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        public ApiResponse Get()
        {
            return new ApiResponse
            {
                Name = $"Name by Api at {DateTime.Now}",
                Age = 1
            };
        }
    }
}