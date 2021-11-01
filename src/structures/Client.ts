import { Client as BaseClient, Collection } from "discord.js";

import { EventHandler } from "handlers/EventHandler";

import { Logger } from "utils/Logger";
import { Util } from "utils/Util";

import { Command } from "./Command";
import * as config from "../config";

export class Client extends BaseClient {
    commands: Collection<string, Command> = new Collection();
    config: typeof config = config;
    logger: Logger = new Logger();
    util: Util = new Util(this);

    constructor() {
        super(config.clientOptions);
    }

    async init() {
        new EventHandler(this).load();
        await this.login(this.config.token);
    }
}
