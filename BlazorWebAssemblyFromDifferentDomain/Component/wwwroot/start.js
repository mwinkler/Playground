
Blazor
    .start({
        loadBootResource: function (type, name, defaultUri, integrity) {
            //console.log(`Loading: '${type}', '${name}', '${defaultUri}', '${integrity}'`);

            var url = 'https://localhost:7070/_framework/' + name;

            if (type == 'dotnetjs')
                return url;

            return fetch(url, {
                cache: 'no-cache'
            });
        }
    });