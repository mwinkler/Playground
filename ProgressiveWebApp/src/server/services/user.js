
const docuemtdb = require('documentdb');
const helper = require('../helper');

const client = helper.cosmosDbClient;
const usersCollection = docuemtdb.UriFactory.createDocumentCollectionUri('pwa-demo', 'users');

function create(subscription, name) {

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
                    
                console.log('Save user to database', result2);
                
                resolve(result2);
            });
        });
    });
}

function get(id) {

    const query = {
        query: 'SELECT * FROM user'
    }

    if (id) {
        query.query += ' WHERE user.id = @id';
        query.parameters = [{ name: '@id', value: id }]
    }

    return new Promise((resolve, reject) => {

        client.queryDocuments(usersCollection, query).toArray((err, result) => {

            if (err) 
                reject(err);

            if (id && result.length === 0)
                reject(`User '${id}' not found`)
            
            resolve(id ? result[0] : result);
        });
    });
}

exports.create = create;
exports.get = get;