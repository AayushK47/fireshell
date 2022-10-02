import { Command } from 'commander';
import { CommandFactory } from './CommandFactory';

function main() {
    const command = new Command();
    const commandFactory = new CommandFactory();

    command
        .command('test')
        .description('Command to generate a new react project')
        .action(commandFactory.getTestCommand().run);
    
    command.parse(process.argv);
}

export default main;