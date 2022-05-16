
using Dapr.Client;

var PUBSUB_NAME = "order-pub-sub";
var TOPIC_NAME = "orders";

while (true)
{
    var random = new Random();
    var orderId = random.Next(1, 1000);
    var source = new CancellationTokenSource();
    using var client = new DaprClientBuilder().Build();
    
    //Using Dapr SDK to publish a topic
    await client.PublishEventAsync(PUBSUB_NAME, TOPIC_NAME, orderId, source.Token);
    Console.WriteLine("Published data: " + orderId);
    Thread.Sleep(1000);
}