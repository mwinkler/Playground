using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace UI.Components
{
    internal class TagSelectorInterop
    {
        internal static Task<string> Prompt(string message)
        {
            // Implemented in exampleJsInterop.js
            return JSRuntime.Current.InvokeAsync<string>("exampleJsFunctions.showPrompt", message);
        }
    }
}
