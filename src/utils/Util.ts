import { parse } from "path";

import { Client } from "structures/Client";

export class Util {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async resolve<T>(client: Client, file: string) {
		const File = await import(file).then((f) => f[parse(file).name]);

		if (!File?.constructor) return;

		return new File(client) as T;
	}
}
