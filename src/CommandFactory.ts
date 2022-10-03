import { AddConfigCommand } from "./commands";

export class CommandFactory {
    getAddConfigCommand() {
        return new AddConfigCommand();
    }
}