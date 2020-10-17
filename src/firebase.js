const firebase = require('firebase');

const firebaseApp = firebase.initializeApp({
    ...require('<Path to firebase credentials>'),
    databaseURL: '<URL of firebase realtime database>'
})

module.exports = {
    firebaseApp
}