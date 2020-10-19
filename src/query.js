const { databaseQuery } = require('./database');
const { firestoreQuery } = require('./firestore');

function processQuery(input, db = process.env.DB){
    let output;
    if(db == 'database'){
        output = databaseQuery(input);

        if(output instanceof Error){
            return output;
        } else {
            return output.then(data => {
                if (data === undefined){
                    return "Query execution successful.";
                } else {
                    return data.val();
                }
            });
        }
    } else {
        output = firestoreQuery(input);
        if(output instanceof Error){
            return output;
        } else {
            return output.then(data => {
                if(data === undefined){
                    return "Query execution successful."
                } else if(data.data === undefined){
                    if(data.empty){
                        return 'No documents found';
                    } else if(data.forEach === undefined) {
                        return "Query execution successful.";
                    }
                    else {
                        let obj = {};
                        data.forEach((doc) => {
                            obj[doc.id] = doc.data();
                        });
                        return obj;
                    }
                } else {
                    return data.data();
                }
            });
        }
    }
}

module.exports = {
    processQuery
}