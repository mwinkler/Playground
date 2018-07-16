
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, "../../data/subscriptions.json");
let isLoaded = false;
let data = [];

function load() {
    
    if (!fs.existsSync(dataPath))
        return;

    const buf = fs.readFileSync(dataPath);
    data = JSON.parse(buf);
}

function save() {

    const json = JSON.stringify(data, undefined, 2);
    fs.writeFileSync(dataPath, json);
}

function add(subscription) {

    // check if endpoint already exists
    if (data.find(d => d.endpoint === subscription.endpoint)) {
        return;
    }

    data.push(subscription);
    
    save();
}

function get() {

    if (!isLoaded) {
        load();
        isLoaded = true;
    }

    return data;
}

exports.add = add;
exports.get = get;