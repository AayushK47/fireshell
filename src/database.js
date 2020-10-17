const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

function databaseQuery(input){
    var filename = shortid.generate();
    fs.writeFileSync(path.join(__dirname, `${filename}.js`),`
        const { firebaseApp } = require('./firebase')
        const db = firebaseApp.database();
        
        function execute(){
            try{
                const promise = ${input}
                return promise;
            } catch(err) {
                return err;
            }
        }

        module.exports = {
            execute
        }
    `);
    var promise = require(path.join(__dirname, `${filename}.js`)).execute();
    fs.unlinkSync(path.join(__dirname, `${filename}.js`));
    return promise;
}

module.exports = {
    databaseQuery
};