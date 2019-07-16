using System;
using System.Collections.Generic;
using System.Text;

namespace Shared
{
    public class Model
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }

    public class Response<T>
    {
        public bool Success { get; set; }
        public T Value { get; set; }
        public string Message { get; set; }
    }

    public class Request
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
