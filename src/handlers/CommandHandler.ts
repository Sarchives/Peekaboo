import { sync } from "glob";
import { resolve } from "path";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { Client } from "structures/Client";
import { Command } from "structures/Command";

export class CommandHandler {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async load() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const body: any[] = [];
		const files = this.client.config.nodeEnv === "production"
			? sync(resolve("build/commands/**/*.js"))
			: sync(resolve("src/commands/**/*.ts"));

		for (const file of files) {
			const command = await this.client.util.resolve<Command>(this.client, file);

			if (!command) throw new Error(`Failed to load command file: ${file}`);

			this.client.commands.set(command.name, command);
			body.push(command);
		}

		const rest = new REST({ version: "9" }).setToken(this.client.config.token);

		try {
			await rest.put(
				!this.client.config.guild
					// client.user.id will be undefined if this function is not called when ready.
					? Routes.applicationCommands(this.client.application!.id)
					: Routes.applicationGuildCommands(this.client.application!.id, this.client.config.guild),
				{ body }
			);

			this.client.logger.info("Reloaded application commands");
		} catch (error) {
			this.client.logger.error(error);
		}
	}
}
