This demo shows how to consume a Blazor WebAssembly application from a remote domain.  
This allows you to place the Blazor application inside any website.

__Component__  
Contains the Blazor application components.  

__Component.Server__  
https://localhost:7070  
This server hosts just the Blazor application WebAssembly as static files.  
Cors support is important here.

__Consumer.Server__  
https://localhost:7071  
This website (index.html) loads the Blazor WebAssembly application from Component.Server host.  
Snippet to load the application:
```
<div id="app">Loading...</div>
<script src="https://localhost:7070/_framework/blazor.webassembly.js" autostart="false"></script>
<script src="https://localhost:7070/start.js"></script>
```