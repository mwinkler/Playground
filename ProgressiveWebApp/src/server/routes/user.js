
const users = require('../services/user');

exports.post = async (req, res) => {

    try {
        const payload = req.body;
    
        console.log('Post user', payload);

        // create user
        const user = await users.create(payload.subscription, payload.username);

        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}