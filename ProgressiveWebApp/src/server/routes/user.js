
const users = require('../services/user');

exports.post = async (req, res) => {

    const payload = req.body;

    console.log('Post user', payload);

    try {
        // create user
        const user = await users.add(payload.subscription, payload.username);

        res.json(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}