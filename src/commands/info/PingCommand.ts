import { CommandInteraction, MessageEmbed } from "discord.js";

import { Client } from "structures/Client";
import { Command } from "structures/Command";

export class PingCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: "ping",
            description: "Fetch the bot's and WebSocket's latency.",
        });
    }

    async execute(interaction: CommandInteraction) {
        const reply = await interaction.deferReply({ fetchReply: true });
        const botLatency = reply["createdAt"].getTime() - interaction["createdAt"].getTime();
        const wsLatency = Math.round(this.client.ws.ping);

        const pingEmbed = new MessageEmbed()
            .setColor(interaction.guild!.me!.displayHexColor)
            .setTitle("🏓 Pong!")
            .addFields(
                { name: "Bot Latency", value: `\`\`\`js\n${botLatency} ms\n\`\`\``, inline: true },
                { name: "WS Latency", value: `\`\`\`js\n${wsLatency} ms\n\`\`\``, inline: true }
            );

        return interaction.editReply({ content: null, embeds: [pingEmbed] });
    }
}
