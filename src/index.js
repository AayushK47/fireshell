const inquirer = require('inquirer');
const fs = require('fs');
const { Command } = require('commander')
const path = require('path');

const { processQuery } = require('./query');
const { processOutput, createConfigFile } = require('./utils');
const { firerun } = require('./callbacks/firerun');
const {
    setConfigCallback,
    resetCallback
} = require('./callbacks/callbacks');

function fireshellCLI() {
    const program = new Command();
    program
        .command('set-config <path> <db>')
        .option('-u, --url type', 'Url for firebase realtime database')
        .action(setConfigCallback);
    
    program
        .command('reset')
        .action(resetCallback);
    
    program
        .command('firerun <inputFilePath> <outputDir>')
        .action(firerun)
    
    program.parse(process.argv);

    if(process.argv.length <= 2) {
        main()
    }
}

function main(){
    console.log(__dirname);
    const dirs = fs.readdirSync(__dirname + "/../")
    if(dirs.indexOf("config.json") === -1) {
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
            createConfigFile(
                path.join(__dirname, '../', 'config.json'),
                {
                    db: responses.db,
                    path: responses.path,
                    url: responses.url
                }
            )
            inputQueries();
        });
    } else {
        inputQueries();
    }
    
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
        } else {
            processOutput(output).then(
                result => {
                    console.log(JSON.stringify(result, null, 2))
                    inputQueries();
                }
            );
        }
    });
}

module.exports = {
    main,
    fireshellCLI,
    inputQueries
}