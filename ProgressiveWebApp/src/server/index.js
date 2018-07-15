const express = require('express');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

require('./subscriptions-azure');

// config middleware
const app = express();
app.use(bodyParser.json());

// config webpush
webpush.setVapidDetails('https://my-pwa.azurewebsites.net/', process.env.APPSETTING_VAPID_PUBLIC_KEY, process.env.APPSETTING_VAPID_PRIVATE_KEY);

// static files
app.use(express.static(path.join(__dirname, '../client')));

// routes
app.post('/subscribe', require('./routes/subscribe').route);
app.post('/push', require('./routes/push').route);
app.get('/env', require('./routes/env').route);

// start server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
