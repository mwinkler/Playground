
using StackExchange.Redis;

var channel = new RedisChannel("test", RedisChannel.PatternMode.Literal);

Task.Run(() =>
{
    while (true)
    {
        using var redis = ConnectionMultiplexer.Connect("localhost");
        var sub = redis.GetSubscriber();

        for (int i = 0; i <= 10; i++)
        {
            sub.Publish(channel, $"Message {i}");
            Console.WriteLine($"Message {i} published successfully");
            Thread.Sleep(2000);
        }
    }
});


using var redis = ConnectionMultiplexer.Connect("localhost");
var sub = redis.GetSubscriber();

sub.Subscribe(channel, (c, val) =>
{
    Console.WriteLine($"Message {val} recivied");
    throw new Exception("Bäm");
}, CommandFlags.PreferMaster);



Console.ReadKey();