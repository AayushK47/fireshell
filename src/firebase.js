const firebase = require('firebase');
const pathpack = require('path');
require('dotenv').config({path: pathpack.resolve('../')});
const path = process.env.CONFIG_PATH;
var config;

if(path === undefined){
    config = JSON.parse(process.env.JSON);
} else {
    config = require(process.env.CONFIG_PATH)
}

const firebaseApp = firebase.initializeApp({
    ...config,
    databaseURL: process.env.URL
});

module.exports = {
    firebaseApp
}