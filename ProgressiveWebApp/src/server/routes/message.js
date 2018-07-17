
const webpush = require('web-push');
const users = require('../services/user');
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

    // get all users
    const userList = await users.get();

    console.log(`Found ${userList.length} users`);

    // send push foreach each user
    userList.forEach(user => {

        console.log('Send push notification', user);

        webpush
            .sendNotification(user.subscription, payload)
            .catch(err => console.error(err));
    });

    res.end();
}

exports.get = async (req, res) => {

    console.log('Get messages');

    const payload = await messages.get();

    await res.json(payload);
}