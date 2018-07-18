
const docuemtdb = require('documentdb');
const bluebird = require('bluebird');

const promisifyAzureSettings = {
    promisifier: (originalFunction) => function (...args) {
        return new Promise((resolve, reject) => {
            try {
                originalFunction.call(this, ...args, (error, result, response) => {
                    error && reject(error);
                    resolve({ result, response });
                });
            } catch (e) {
                reject(e);
            }
        });
    }
};


const cosmosDbClient = bluebird.promisifyAll(
    new docuemtdb.DocumentClient(process.env.AZURE_COSMOSDB_ENDPOINT, { masterKey: process.env.AZURE_COSMOSDB_KEY }),
    promisifyAzureSettings);

exports.cosmosDbClient = cosmosDbClient;