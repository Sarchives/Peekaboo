import { Client } from "./Client";

import { IEvent } from "typings/index";

export abstract class Event implements IEvent {
    client: Client;
    name: string;
    once?: boolean;

    constructor(client: Client, data: {
        name: IEvent["name"],
        once?: IEvent["once"]
    }) {
        this.client = client;
        this.name = data.name;
        this.once = data.once;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract execute(...args: any[]): void;
}
