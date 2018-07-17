
// load .env file (local)
require('dotenv').config();

const express = require('express');
const path = require('path');
const webpush = require('web-push');
const userRoute = require('./routes/user');
const messageRoute = require('./routes/message');

// config webpush
webpush.setVapidDetails('https://my-pwa.azurewebsites.net/', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

// middleware
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// routing
app.post('/api/user', userRoute.post);
app.post('/api/message', messageRoute.post);
app.get('/api/message', messageRoute.get);
app.get('/api/key', (req, res) => res.json({ key: process.env.VAPID_PUBLIC_KEY }));

// start server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
