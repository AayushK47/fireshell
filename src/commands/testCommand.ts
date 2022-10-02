import { Command } from "../interfaces";

export class TestCommand implements Command{
    run() {
        console.log('Hello From test command');
    }
}