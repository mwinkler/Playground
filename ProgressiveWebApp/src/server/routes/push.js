
const webpush = require('web-push');
const subscrptions = require('../subscriptions-azure');

exports.route = (req, res) => {

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' });

    // get all subscriptions
    const subs = subscrptions.get();

    console.log(`Found ${subs.length} subscrptions`);

    // send push foreach each subscrption
    subs.forEach(sub => {

        console.log('Send push notification to:', sub);

        webpush
            .sendNotification(sub, payload)
            .catch(err => console.error(err));
    });
}