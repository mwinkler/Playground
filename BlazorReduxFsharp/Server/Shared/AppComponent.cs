using Blazor.Server.Redux;
using MyLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Shared
{
    public class AppComponent : ReduxComponent<MyState, MyMessage>
    {
        protected MyState State => Store.State;
        protected void Dispatch(MyMessage action) => Store.Dispatch(action);
    }
}
