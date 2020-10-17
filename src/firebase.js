const firebase = require('firebase');
const config = require('../config.json');

const firebaseApp = firebase.initializeApp({
    ...require(config.path),
    databaseURL: config.url
});

module.exports = {
    firebaseApp
}