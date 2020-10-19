const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { processQuery } = require('./query');

function main(){
    inquirer.prompt([
        {
            'type': 'list',
            'name': 'db',
            'message': 'Choose one of the following',
            'choices': ['Realtime Database', 'Cloud Firestore']
        },
        {
            'type': 'input',
            'name': 'path',
            'message': 'Enter the absolute path to firebase config file\n'
        },
        {
            'type': 'input',
            'name': 'url',
            'message': 'Enter the url of firebase realtime database. (Ignore if you chose Cloud Firestore)\n'
        }
    ]).then(responses => {
        if(responses.db === 'Realtime Database'){
            responses.db = 'database';
        } else {
            responses.db = 'firestore'
        }
    
        if(responses.db === 'database' && responses.url === ''){
            console.error(Error('You need to provide the database url in order to connect to the realtime database'));
            process.exit();
        }

        fs.writeFileSync(path.join(__dirname, '../', 'config.json'), JSON.stringify({db: responses.db, path: responses.path, url: responses.url}));
        inputQueries();
    
    });
}

function inputQueries() {
    inquirer.prompt({
        'type': 'input',
        'name': 'query',
        'message': "> "
    }).then(response => {
        var output = processQuery(response.query);
        if(output instanceof Error){
            console.error(`\n${output}\n`);
            inputQueries();
        } else{
            output.then(data => {
                if(typeof data === 'string'){
                    console.log(`\n${data}\n`);
                    console.log(`\nQuery execution failed\n`);
                } else if(typeof data === 'object' && data !== null){
                    console.log(JSON.stringify(data, null, 4));
                    console.log('\nQuery execution successful\n');
                } else if(data instanceof Error){
                    console.error(data);
                }
                inputQueries();
            });
        }
    });
}

module.exports = {
    main
}