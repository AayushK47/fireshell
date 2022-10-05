import { Command } from 'commander';
import { CommandFactory } from './CommandFactory';

function main() {
    const command = new Command();
    const commandFactory = new CommandFactory();

    command
        .command('add-config')
        .description('Command to add a firebase project config')
        .action(commandFactory.getAddConfigCommand().run);
    
    command.parse(process.argv);
}

export default main;