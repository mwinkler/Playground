
const subscrptions = require('../services/subscription');

exports.post = async (req, res) => {

    const subscription = req.body;

    console.log('Post subscription', subscription);

    if (!subscription.endpoint) {
        res.status(400).end();
        return;
    }

    // store subscrption
    await subscrptions.add(subscription);

    res.end();
}