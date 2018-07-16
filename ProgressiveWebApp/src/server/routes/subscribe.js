
const subscrptions = require('../services/subscription');

exports.post = (req, res) => {

    const subscription = req.body;

    console.log('Subscribe request:', subscription)

    if (!subscription.endpoint) {
        res.status(500);
        return;
    }

    // store subscrption
    subscrptions.add(subscription);

    res.end();
}

exports.key = (req, res) => {

    res.json({ key: process.env.VAPID_PUBLIC_KEY })
}