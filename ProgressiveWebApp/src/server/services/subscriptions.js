
const azure = require('azure-storage');
const bluebird = require('bluebird');
const helper = require('../helper');

const blobContainer = 'pwa-demo';
const dataPath = 'subscriptions.json';
const fs = bluebird.promisifyAll(azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_KEY), helper.promisifyAzureSettings);

let data = [];

async function load() {

    // check if file exists
    const existResponse = await fs.doesBlobExistAsync(blobContainer, dataPath);
    
    if (!existResponse || !existResponse.result.exists) {
        return;
    }

    // load file from storage
    const fileResponse = await fs.getBlobToTextAsync(blobContainer, dataPath);

    // parse data
    data = JSON.parse(fileResponse.result);
}

async function save() {

    const json = JSON.stringify(data, undefined, 2);

    await fs.createBlockBlobFromTextAsync(blobContainer, dataPath, json);
}

function add(subscription) {

    // check if endpoint already exists
    if (data.find(d => d.endpoint === subscription.endpoint)) {
        return;
    }

    data.push(subscription);
    
    save();
}

load();

exports.add = add;
exports.get = () => data;