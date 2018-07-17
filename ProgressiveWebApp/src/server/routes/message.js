
const webpush = require('web-push');
const users = require('../services/user');
const messages = require('../services/message');

exports.post = async (req, res) => {

    try {
        const data = req.body;
    
        console.log('Post message', data);

        // get user of message
        const user = await users.get(data.userId);
    
        // create message
        const message = await messages.create(data.message, user.name);
    
        // get all users
        const userList = await users.get();
        
        console.log(`Found ${userList.length} users`);
        
        // create push message
        const payload = JSON.stringify(message);

        // send push foreach each user
        userList.forEach(user => {
    
            // do not send push notification to sender
            if (user.id === data.userId) {
                return;
            }
    
            // send push notification
            console.log('Send push notification', user);
    
            webpush
                .sendNotification(user.subscription, payload)
                .catch(err => console.error(err));
        });
    
        res.end();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

exports.get = async (req, res) => {

    console.log('Get messages');

    const payload = await messages.get();

    await res.json(payload);
}