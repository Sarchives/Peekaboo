import { ApplicationCommandOptionData } from "discord.js";

export interface ICommand {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract execute(...args: any[]): void;
}

export interface IEvent {
    name: string;
    once?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract execute(...args: any[]): void;
}
