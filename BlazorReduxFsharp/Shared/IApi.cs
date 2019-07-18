using System;
using System.Threading.Tasks;

namespace Shared
{
    public interface IApi
    {
        Task<string> GetSomething(string value);
        string GetValue(string value);
        Task<Response<Model>> GetResponse(Request request);
    }
}
