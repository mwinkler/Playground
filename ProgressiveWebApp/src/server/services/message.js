
const docuemtdb = require('documentdb');
const helper = require('../helper');

const client = helper.cosmosDbClient;
const chatsCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'messages');

async function add(data) {

    if (!isValid(data)) {
        throw 'Message is invalid'
    }

    data.timestamp = new Date();

    await client.createDocumentAsync(chatsCollection, data);

    console.log('Save message to database');
}

function get() {

    return new Promise((resolve, reject) => {

        client.queryDocuments(chatsCollection, 'SELECT * FROM message').toArray((err, result) => {
            
            if (err) 
                reject(err);
            else
                resolve(result);
        });
    });
}

function isValid(data) {

    return !(!data || !data.message || !data.username)
}

exports.add = add;
exports.get = get;
exports.isValid = isValid;