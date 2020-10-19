const firebase = require('firebase');
require('dotenv').config();

var config;
var config_file;
if(process.env.CONFIG_PATH || process.env.JSON){
    const path = process.env.CONFIG_PATH;

    if(path === undefined){
        config = JSON.parse(process.env.JSON);
    } else {
        config = require(process.env.CONFIG_PATH)
    }
} else {
    config_file = require('../config.json');
    config = require(config_file.path);
}

const firebaseApp = firebase.initializeApp({
    ...config,
    databaseURL: process.env.URL || config_file.url
});

module.exports = {
    firebaseApp
}