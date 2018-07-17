
const webpush = require('web-push');
const subscrptions = require('../services/subscription');
const messages = require('../services/message');

exports.post = async (req, res) => {

    const message = req.body;

    console.log('Post message', message);

    if (!messages.isValid(message)) {
        res.status(400).end();
        return;
    }

    // save message to db
    await messages.add(message);

    // create push message
    const payload = JSON.stringify(message);

    // get all subscriptions
    const subs = await subscrptions.get();

    console.log(`Found ${subs.length} subscrptions`);

    // send push foreach each subscrption
    subs.forEach(sub => {

        console.log('Send push notification to:', sub);

        webpush
            .sendNotification(sub, payload)
            .catch(err => console.error(err));
    });

    res.end();
}

exports.get = async (req, res) => {

    console.log('Get messages');

    const payload = await messages.get();

    await res.json(payload);
}