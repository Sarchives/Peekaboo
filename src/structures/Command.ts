import { ApplicationCommandOptionData } from "discord.js";

import { ICommand } from "typings/index";

import { Client } from "./Client";

export abstract class Command implements ICommand {
    client: Client;
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];

    constructor(client: Client, data: {
        name: ICommand["name"],
        description: ICommand["description"],
        options?: ICommand["options"]
    }) {
        this.client = client;
        this.name = data.name;
        this.description = data.description;
        this.options = data.options;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract execute(...args: any[]): void;
}

