import chalk from "chalk";

import { CommandHandler } from "handlers/CommandHandler";

import { Client } from "structures/Client";
import { Event } from "structures/Event";

export class ReadyEvent extends Event {
    constructor(client: Client) {
        super(client, {
            name: "ready",
            once: true,
        });
    }

    async execute() {
        this.client.logger.info(`Logged in as ${chalk.bold(this.client.user?.tag)}.`);
        new CommandHandler(this.client).load();
    }
}
