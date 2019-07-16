using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shared
{
    public class Api : IApi
    {
        public static Api Instance { get; } = new Api();

        public Task<string> GetSomething(string value)
        {
            return Task.FromResult(value);
        }

        public string GetValue(string value) => value;

        public Task<Response<Model>> GetResponse(Request request)
        {
            return Task.FromResult(new Response<Model>
            {
                Message = request.Message,
                Success = request.Success,
                Value = new Model
                {
                    Age = 99,
                    Name = request.Message
                }
            });
        }
    }
}
