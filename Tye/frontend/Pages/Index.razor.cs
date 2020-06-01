
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;

namespace frontend.Pages
{
    public partial class Index
    {
        [Inject]
        private IServer Server { get; set; }

        //[Inject]
        //public ISession Session { get; set; }

        [Inject]
        public IDistributedCache DistributedCache { get; set; }

        public string ServerUrls { get; set; }

        public string SessionValue { get; set; }

        protected override void OnInitialized()
        {
            var serverAddressesFeature = Server.Features.Get<IServerAddressesFeature>();

            ServerUrls = string.Join(", ", serverAddressesFeature.Addresses);

            SessionValue = DistributedCache.GetString("name");
        }

        void SetValue()
        {
            DistributedCache.SetString("name", SessionValue);
        }

    }
}
