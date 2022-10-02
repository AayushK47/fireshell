import { TestCommand } from "./commands";

export class CommandFactory {

    getTestCommand() {
        return new TestCommand();
    }
}