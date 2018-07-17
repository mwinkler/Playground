
const docuemtdb = require('documentdb');
const helper = require('../helper');

const client = helper.cosmosDbClient;
const chatsCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'messages');

function create(message, username) {

    return new Promise((resolve, reject) => {

        if (!message || !username) {
            reject('Message or username is missing')
        }
    
        const data = {
            message: message,
            username: username,
            timestamp: new Date()
        }
    
        client.createDocument(chatsCollection, data, (err, result) => {

            if (err)
                reject(err);

            console.log('Save message to database', result);

            resolve(result);
        });
    });
}

function get() {

    return new Promise((resolve, reject) => {

        client.queryDocuments(chatsCollection, 'SELECT * FROM message').toArray((err, result) => {
            
            if (err) 
                reject(err);
            
            resolve(result);
        });
    });
}

exports.create = create;
exports.get = get;