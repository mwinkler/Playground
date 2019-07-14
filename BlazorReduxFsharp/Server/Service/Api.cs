using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Service
{
    public class Api : IApi
    {
        public Task<string> GetSomething(string value)
        {
            return Task.FromResult(value);
        }
    }
}
