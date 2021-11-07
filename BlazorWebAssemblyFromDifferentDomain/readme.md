This demo shows how to consume a Blazor WebAssembly application as WebComponent/Custom Element from a remote domain.  
This allows you to place the Blazor application inside any website.

__Component__  
Contains the Blazor application components.  

__Component.Server__  
https://localhost:7070  
This server hosts the Blazor application WebAssembly static files.  
Cors support is important here.

__Consumer.Server__  
https://localhost:7071  
On this website (index.html) the WebComponent is placed and loads the Blazor WebAssembly application from remote host (Component.Server).  

```
<counter-app increment-amount="2"></counter-app>
<script src="https://localhost:7070/bootstrap.js"></script>
```