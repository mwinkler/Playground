
const docuemtdb = require('documentdb');
const helper = require('../helper');

const client = helper.cosmosDbClient;
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