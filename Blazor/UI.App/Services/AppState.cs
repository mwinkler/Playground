using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UI.App.Services
{
    public class AppState
    {
        public string Name { get; set; } = "Default";

        public void SetName(string name)
        {
            Name = name;
        }
    }
}
