
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, "../../data/subscriptions.json");
const isLoaded = false;
let data = [];

function load() {
    
    if (!fs.exists(dataPath))
        return;

    const buf = fs.readFileSync(dataPath);
    data = JSON.parse(buf);
}

function save() {

    const json = JSON.stringify(data);
    fs.writeFileSync(dataPath, json);
}

function add(subscription) {

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