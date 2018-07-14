const express = require('express');
const path = require('path');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const routeSubscribe = require('./routes/subscribe');
const routePush = require('./routes/push');

// config
const port = process.env.PORT || 3000;
const publicVapidKey = 'BJqpL34rJaUdm2lG6o_Min8riEf6o6NLhCspZsTcHvtQhagg9O-68QShLZ2Vz-utlJ3RXxQtfK3koqhWGYgwNRQ';
const privateVapidKey = '0B22NrQH3DLygxIVV6bDTH4d3Q6K0t1xZ7utQ0Qa-yk';

// config middleware
const app = express();
app.use(bodyParser.json());

// config webpush
webpush.setVapidDetails('https://my-pwa.azurewebsites.net/', publicVapidKey, privateVapidKey);

// static files
app.use(express.static(path.join(__dirname, '../client')));

// routes
app.post('/subscribe', routeSubscribe.subscribe);
app.post('/push', routePush.push);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}`));
