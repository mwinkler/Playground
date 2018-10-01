using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UI.App.Components;

namespace UI.App.Services
{
    public class AppState
    {
        public string Name { get; set; } = "Default";

        public ObjectComponentModel Data { get; set; }

        public void SetName(string name)
        {
            Name = name;
        }
    }
}
