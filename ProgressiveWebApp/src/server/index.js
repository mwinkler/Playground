const express = require('express');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');

// load .env file (local)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// config webpush
webpush.setVapidDetails('https://my-pwa.azurewebsites.net/', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

// config middleware
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// config routes
app.post('/api/subscription', require('./routes/subscribe').post);
app.post('/api/message', require('./routes/push').post);
app.get('/api/key', (req, res) => res.json({ key: process.env.VAPID_PUBLIC_KEY }));

// start server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
