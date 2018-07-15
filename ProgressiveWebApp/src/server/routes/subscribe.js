
const subscrptions = require('../subscriptions-azure');

exports.route = (req, res) => {

    const subscription = req.body;

    console.log('Subscribe request:', subscription)

    if (!subscription.endpoint) {
        res.status(500);
        return;
    }

    // store subscrption
    subscrptions.add(subscription);

    // Send 201 - resource created
    res.status(201).json({});
}