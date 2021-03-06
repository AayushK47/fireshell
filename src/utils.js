const fs = require('fs');

function createConfigFile(path, data) {
    fs.writeFile(
        path, JSON.stringify(data), 
        (err) => { 
            if(err) { 
                console.log(err)
            } else {
                console.log("File created successfully")
            }
        }
    );
}

async function processOutput(output) {
    const data = await output;
    if(typeof data === 'string'){
        return { data, message: `Query execution successful` };
    } else if(typeof data === 'object' && data !== null) {
        return { data, message: `Query execution successful` };
    } else if(data instanceof Error){
        return { data, message: "Query execution failed" }
    }
}

module.exports = {
    createConfigFile,
    processOutput
}