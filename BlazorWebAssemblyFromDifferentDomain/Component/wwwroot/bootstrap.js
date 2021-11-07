
(function () {

    var remote_url = 'https://localhost:7070';

    var startBlazor = function () {
        Blazor.start({
            loadBootResource: function (type, name, defaultUri, integrity) {
                //console.log(`Loading: '${type}', '${name}', '${defaultUri}', '${integrity}'`);

                var url = remote_url + '/_framework/' + name;

                if (type == 'dotnetjs')
                    return url;

                return fetch(url, {
                    cache: 'no-cache'
                });
            }
        });
    }

    var loadJS = function (url, callback, disable_autostart) {
        var scriptTag = document.createElement('script');
        scriptTag.src = url;

        if (disable_autostart)
            scriptTag.setAttribute('autostart', 'false');

        if (callback)
            scriptTag.onload = callback;

        document.body.appendChild(scriptTag);
    };

    loadJS(remote_url + '/_content/Microsoft.AspNetCore.Components.CustomElements/BlazorCustomElements.js');
    loadJS(remote_url + '/_framework/blazor.webassembly.js', startBlazor, true);

})();
