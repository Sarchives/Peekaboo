import axios from "axios";
import { CommandInteraction, MessageEmbed } from "discord.js";

import { Client } from "structures/Client";
import { Command } from "structures/Command";

export class CatCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: "cat",
            description: "Fetch a random cat from the aws.random.cat API.",
        });
    }

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const response = await axios.post("https://aws.random.cat/meow");
        const data = await response.data;

        const meowEmbed = new MessageEmbed()
            .setColor(interaction.guild!.me!.displayHexColor)
            .setTitle("😺 Meow!")
            .setImage(data.file);

        return interaction.editReply({ embeds: [meowEmbed] });
    }
}
