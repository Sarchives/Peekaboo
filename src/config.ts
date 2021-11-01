import "dotenv/config";

import Joi from "joi";
import { ClientOptions, Intents, LimitedCollection, Options } from "discord.js";

function validateEnv() {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid("development", "production").required(),
        DEV_GUILD: Joi.string().required(),
        OWNERS: Joi.string().default("[]"),
        DISCORD_TOKEN: Joi.string().required(),
    })
        .unknown();

    const { error, value } = schema.prefs({ errors: { label: "key" } }).validate(process.env);

    if (error) throw new Error(`Failed to validate ProcessEnv: ${error.message}`);

    return value;
}

export const clientOptions: ClientOptions = {
    allowedMentions: {
        parse: ["users"],
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
    makeCache: Options.cacheWithLimits({
        ...Options.defaultMakeCacheSettings,
        MessageManager: {
            maxSize: 20,
            sweepInterval: 300,
            sweepFilter: LimitedCollection.filterByLifetime({
                lifetime: 1800,
                getComparisonTimestamp: (e) => e.editedTimestamp ?? e.createdTimestamp,
            }),
        },
        ThreadManager: {
            sweepInterval: 300,
            sweepFilter: LimitedCollection.filterByLifetime({
                getComparisonTimestamp: (e) => e.archiveTimestamp!,
                excludeFromSweep: (e) => !e.archived,
            }),
        },
    }),
};

const value = validateEnv();

export const nodeEnv: "development" | "production" = value.NODE_ENV;
export const devGuild = value.DEV_GUILD;
export const owners: string[] = JSON.parse(value.OWNERS);
export const token = value.DISCORD_TOKEN;
