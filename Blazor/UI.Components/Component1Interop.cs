using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace UI.Components
{
    internal class Component1Interop
    {
        internal static Task<string> Prompt(string message)
        {
            // Implemented in exampleJsInterop.js
            return JSRuntime.Current.InvokeAsync<string>(
                "exampleJsFunctions.showPrompt",
                message);
        }
    }
}
