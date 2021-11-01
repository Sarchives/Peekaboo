import { Interaction } from "discord.js";

import { Client } from "structures/Client";
import { Event } from "structures/Event";

export class InteractionCreateEvent extends Event {
    constructor(client: Client) {
        super(client, {
            name: "interactionCreate",
        });
    }

    async execute(interaction: Interaction) {
        const command = interaction.isButton()
            ? this.client.commands.get(interaction["customId"])
            : this.client.commands.get(interaction["commandName"]);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.channel!.send({ content: "err0r" });
        }
  }
}