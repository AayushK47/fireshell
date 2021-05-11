const path = require('path');
const fs = require('fs');

const { createConfigFile } = require('../utils');

function setConfigCallback(fbJSONPath, db, _command, options) {
    const config = {}
    if(options === undefined) {
        config.path = fbJSONPath;
        config.db = db;
        config.url = '';
    } else {
        config.path = fbJSONPath;
        config.db = db;
        config.url = options[0];
    }
    createConfigFile(
        path.join(__dirname, '../', 'config.json'),
        config
    )
}

function resetCallback() {
    fs.unlink(path.join(__dirname, '../', 'config.json'), () => console.log('Config deleted successfully'))
}

module.exports = {
    setConfigCallback,
    resetCallback
}