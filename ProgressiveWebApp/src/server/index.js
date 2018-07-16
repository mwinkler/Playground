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
app.post('/subscribe', require('./routes/subscribe').post);
app.get('/subscribe/key', require('./routes/subscribe').key);
app.post('/push', require('./routes/push').route);

// start server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
