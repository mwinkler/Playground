using Bogus;
using Nest;
using System;

namespace Elasticsearch
{
    class Program
    {
        private static ConnectionSettings Settings = new ConnectionSettings(new Uri("http://localhost:9200"));
        private static ElasticClient Client = new ElasticClient(Settings);

        static void Main(string[] args)
        {
            Create();
        }

        static void Read()
        {

        }

        static void Create()
        {
            var users = new Faker<User>()
                .RuleFor(p => p.Id, f => f.IndexGlobal)
                .RuleFor(p => p.Name, f => f.Name.FullName())
                .RuleFor(p => p.Mail, f => f.Internet.Email())
                .Generate(1000);

            var respoinse = Client.IndexMany(users, "users");
            //var response = Client.Index(user, idx => idx.Index("users"));
        }
    }
}
