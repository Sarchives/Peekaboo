import "dotenv/config";

import { Client } from "structures/Client";

const client = new Client();

client.init().catch((error: unknown) =>
	client.logger.error(error));
