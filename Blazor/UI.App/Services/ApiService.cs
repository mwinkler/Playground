using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Blazor;
using UI.Shared;

namespace UI.App.Services
{
    public class ApiService
    {
        private readonly HttpClient _client;

        public ApiService(HttpClient client)
        {
            _client = client;
        }

        public async Task<ApiResponse> GetApiResponse()
        {
            return await _client.GetJsonAsync<ApiResponse>("/api");
        }
    }
}
