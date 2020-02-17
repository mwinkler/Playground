using Bogus;
using Nest;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Elasticsearch
{
    class Program
    {
        private static ConnectionSettings Settings = new ConnectionSettings(new Uri("http://localhost:9200"));
        private static ElasticClient Client = new ElasticClient(Settings);

        static void Main(string[] args)
        {
            Settings.DefaultMappingFor<User>(map => map.IndexName("users"));
            
            //Create();
            Search();
        }

        static void Search()
        {
            //var result = Client.Search<User>(s =>
            //    s.Query(q => q
            //        .Match(m => m
            //            .Field(f => f.Name)
            //            .Query("Allison")))
            //);

            var result = Client.Search<User>(s =>
                s.Query(q => q
                    .Fuzzy(m => m
                        .Field(f => f.Name)
                        .Value("Allison")))
            );

            Console.WriteLine(JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true }));
        }

        static void Create()
        {
            var users = new Faker<User>()
                .RuleFor(p => p.Id, f => f.IndexGlobal)
                .RuleFor(p => p.Name, f => f.Name.FullName())
                .RuleFor(p => p.Mail, f => f.Internet.Email())
                .Generate(1000);

            var respoinse = Client.IndexMany(users);
            //var response = Client.Index(user, idx => idx.Index("users"));
        }
    }
}
