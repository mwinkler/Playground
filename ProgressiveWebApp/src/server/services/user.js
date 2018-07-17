
const docuemtdb = require('documentdb');
const helper = require('../helper');

const client = helper.cosmosDbClient;
const usersCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'users');

function add(subscription, name) {

    return new Promise((resolve, reject) => {

        if (!subscription || !subscription.endpoint || !subscription.keys) {
            reject('Subscription is invalid');
            return;
        }

        if (!name) {
            reject('Username is invalid');
            return;
        }

        // check if endpoint already exsist
        const query = {
            query: 'SELECT * FROM user WHERE user.name = @name',
            parameters: [
                //{ name: '@endpoint', value: subscription.endpoint },
                { name: '@name', value: name }
            ]
        }
        
        client.queryDocuments(usersCollection, query).toArray((err, result) => {

            if (err) { 
                reject(err); 
                return; 
            }

            if (result.length > 0) {
                reject(`User '${name}' already exists`)
                return;
            }

            const user = {
                subscription,
                name
            }

            client.createDocument(usersCollection, user, (err2, result2) => {

                if (err2)
                    reject(err2); 
                else
                    resolve(result2);
            });
        });
    });
}

function get() {

    return new Promise((resolve, reject) => {

        client.queryDocuments(subscriptionsCollection, 'SELECT * FROM user').toArray((err, result) => {

            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}

exports.add = add;
exports.get = get;