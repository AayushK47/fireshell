const path = require('path');
const fs = require('fs');

const { createConfigFile } = require('./utils');

function setConfigCallback(fbJSONPath, db, _command, options) {
    const config = {}

    console.log(fbJSONPath)
    console.log(db)
    console.log(options)

    if(options === undefined) {
        config.path = fbJSONPath;
        config.db = db;
        config.url = '';
    } else {
        config.path = db;
        config.db = options[0];
        config.url = fbJSONPath;
    }
    createConfigFile(
        path.join(__dirname, '../', 'config.json'),
        config
    )
}

function resetCallback() {
    fs.unlink(path.join(__dirname, '../', 'config.json'), () => 0)
}

module.exports = {
    setConfigCallback,
    resetCallback
}