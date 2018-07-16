
const subscrptions = require('../services/subscription');

exports.route = (req, res) => {

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