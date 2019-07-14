using System;
using System.Threading.Tasks;

namespace Shared
{
    public interface IApi
    {
        Task<string> GetSomething(string value);
    }
}
