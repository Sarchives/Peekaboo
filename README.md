# Peekaboo

Peekaboo is the official [@Seltorn](https://github.com/Seltorn) Discord bot that's built on TypeScript.

## Setup

**1.** Rename `.env.example` to `.env` in the project's root directory and remove the comments *(if preferable)*. Then, fill out the values with values of your own. The result should look something like this:

```js
NODE_ENV="production"
DEV_GUILD="904435351031005184"
OWNERS=["529555128760401920"]
DISCORD_TOKEN="ODIwNTE0NDg1NDYyMzY4Mjg2.YE2RqQ.6imGYEahplB4n44Y75uYdJnTY2A"
```

**2.** Add bot to your server. You can generate the the link in the Developer Portal or use the link below, replacing `APPLICATION_ID` with your bot's client ID.

[https://discord.com/oauth2/authorize?&client_id=](https://discord.com/oauth2/authorize?&client_id=APPLICATION_ID&scope=bot&permissions=0)[`APPLICATION_ID`](https://discord.com/oauth2/authorize?&client_id=APPLICATION_ID&scope=bot&permissions=0)[&scope=bot&permissions=0](https://discord.com/oauth2/authorize?&client_id=APPLICATION_ID&scope=bot&permissions=0)

*Note: If using the Developer Portal, please select the `bot` and `applications.commands` scopes.*

**3.** Lastly, run `npm install`, then `npm run start`, and the bot should be up and running.
