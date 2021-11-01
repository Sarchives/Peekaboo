import { sync } from "glob";
import { resolve } from "path";

import { Client } from "structures/Client";
import { Event } from "structures/Event";

export class EventHandler {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async load() {
		const files = this.client.config.nodeEnv === "production"
			? sync(resolve("build/events/**/*.js"))
			: sync(resolve("src/events/**/*.ts"));

		for (const file of files) {
			const event = await this.client.util.resolve<Event>(this.client, file);

			if (!event) throw new Error(`Failed to load event file: ${file}`);
			
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.client[event.once ? "once" : "on"](event.name, (...args: any[]) =>
				event.execute(...args)
			);
		}
	}
}
