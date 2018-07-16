
const docuemtdb = require('documentdb');
const bluebird = require('bluebird');
const helper = require('../helper');

const client = bluebird.promisifyAll(
    new docuemtdb.DocumentClient(process.env.AZURE_COSMOSDB_ENDPOINT, { masterKey: process.env.AZURE_COSMOSDB_KEY }),
    helper.promisifyAzureSettings);

const chatsCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'chats');

async function addMessage(data) {

    if (!data || !data.message || !data.user) {
        throw 'Message is invalid'
    }

    data.timestamp = new Date();

    await client.createDocumentAsync(chatsCollection, data);
}

function getMessages() {

    return new Promise((resolve, reject) => {

        client.queryDocuments(chatsCollection, 'SELECT * FROM c').toArray((err, result) => {
            
            if (err) 
                reject(err);
            else
                resolve(result);
        });
    })
}

exports.addMessage = addMessage;
exports.getMessages = getMessages;