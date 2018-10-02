using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UI.App.Components;
using UI.Components;

namespace UI.App.Services
{
    public class AppState
    {
        private readonly ApiService _apiService;

        public AppState(ApiService apiService)
        {
            _apiService = apiService;
        }

        public string Name { get; set; } = "Default";

        public ObjectComponentModel Data { get; set; }

        public IEnumerable<TagSelectorItem> SelectableItems { get; set; }
        public IList<TagSelectorItem> SelectedItems { get; } = new List<TagSelectorItem>();

        public void SetName(string name)
        {
            Name = name;
        }

        public async Task UpdateByApi()
        {
            var apiResponse = await _apiService.GetApiResponse();

            Data.Name = apiResponse.Name;
            Data.Age = apiResponse.Age;
        }
    }
}
