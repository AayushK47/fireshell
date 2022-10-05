import { existsSync } from 'fs';
import { prompt } from 'inquirer';
import { join, resolve,  } from 'path';
import { Command, IConfig } from "../interfaces";
import { access, constants, readFile, writeFile } from 'fs/promises';

export class AddConfigCommand implements Command{
    async run() {
        try {
            const { projectName, fbConfigPath, databaseUrl } = await prompt<IConfig>([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Please enter the project name: '
                },
                {
                    type: 'input',
                    name: 'fbConfigPath',
                    message: 'Please enter the absolute path to firebase config file: \n'
                },
                {
                    type: 'input',
                    name: 'databaseUrl',
                    message: 'Enter the url of firebase realtime database. (Optional but required for realtime database)'
                }
            ]);
    
            if(!fbConfigPath || !projectName || !databaseUrl) {
                throw new Error('Invalid arguments');
            }
    
            await access(fbConfigPath, constants.F_OK);

            const path = join(__dirname, '..', 'config.json')
            const fileExists = existsSync(path);
            let config: IConfig[] = [];

            if(fileExists) {
                const buffer = await readFile(path);
                config = JSON.parse(buffer.toString()) as IConfig[];
                for(let c of config) {
                    if(c.projectName === projectName) {
                        throw new Error("Project already exists");
                    }
                }
            }

            config.push({
                fbConfigPath,
                projectName,
                databaseUrl
            });

            await writeFile(path, JSON.stringify(config));
        } catch(e) {
            console.log(e);
        }

    }
}