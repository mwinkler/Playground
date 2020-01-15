using Microsoft.FSharp.Control;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server
{
    public static class Extensions
    {
        public static Task<T> AsAsync<T>(this FSharpAsync<T> func)
        {
            return func;
        }

    }
}
