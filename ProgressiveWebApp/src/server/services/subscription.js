
const docuemtdb = require('documentdb');
const bluebird = require('bluebird');
const helper = require('../helper');

const client = bluebird.promisifyAll(
    new docuemtdb.DocumentClient(process.env.AZURE_COSMOSDB_ENDPOINT, { masterKey: process.env.AZURE_COSMOSDB_KEY }),
    helper.promisifyAzureSettings);

const subscriptionsCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'subscriptions');

function add(subscription) {

    return new Promise((resolve, reject) => {

        if (!subscription || !subscription.endpoint || !subscription.keys) {
            reject('Subscription is invalid');
            return;
        }

        const query = {
            query: 'SELECT * FROM c WHERE c.endpoint = @endpoint',
            parameters: [{ name: '@endpoint', value: subscription.endpoint }]
        }

        client.queryDocuments(subscriptionsCollection, query).toArray((err, result) => {

            if (err) { 
                reject(err); 
                return; 
            }

            if (result.length > 0) {
                resolve();
                return;
            }

            client.createDocument(subscriptionsCollection, subscription, (err2, result2) => {

                if (err2)
                    reject(err2); 
                else
                    resolve();
            });
        });
    });
}

function get() {

    return new Promise((resolve, reject) => {

        client.queryDocuments(subscriptionsCollection, 'SELECT * FROM c').toArray((err, result) => {

            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}

exports.add = add;
exports.get = get;