const inquirer = require('inquirer');
const fs = require('fs');
const { Command } = require('commander')
const path = require('path');
const { processQuery } = require('./query');
const { processOutput, createConfigFile } = require('./utils');
const { firerun } = require('./firerun');

function fireshellCLI() {
    const program = new Command();
    program
        .command('set-config <path> <db>')
        .option('-u, --url type', 'Url for firebase realtimr database')
        .action(
            (fbJSONPath, db, _command, options) => {
                const config = {}
                if(options === undefined) {
                    config.path = fbJSONPath;
                    config.db = db;
                    config.url = '';
                } else {
                    config.path = fbJSONPath;
                    config.db = db;
                    config.url = options[0];
                    console.log(options[0])
                }
                console.log()
                createConfigFile(
                    path.join(__dirname, '../', 'config.json'),
                    config
                )
            }
        );
    
    program
        .command('reset')
        .action(() => {
            fs.unlink(
                path.join(__dirname, '../', 'config.json'),
                () => console.log('Config deleted successfully')
            )
        });
    
    program
        .command('firerun <inputFilePath> <outputDir>')
        .action((inputFilePath, outDir) => {
            firerun(inputFilePath, outDir)
        })
    
    program.parse(process.argv);

    if(process.argv.length <= 2) {
        main()
    }
}

function main(){
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
    fireshellCLI
}