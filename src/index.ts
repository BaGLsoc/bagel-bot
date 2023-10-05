import { Client, GatewayIntentBits, Guild } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands/command-list";
import { config } from "./config";
import { verifyUser } from "./functions/verify-user";
import { logVerificationErrorMessage } from "./functions/admin-logger";

/**
 * Create a new Discord Client and set its intents to determine which events
 * the bot will receive information about.
 */
export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
    deployCommands({ guildId: config.GUILD_ID });
});

/**
 * Watches for messages from webhook channel
 */
client.on("messageCreate", async (message) => {
    // ignores messages that aren't of format (don't include delimiters)
    if (
        message.channelId === config.WEBHOOK_CHANNEL &&
        message.author.id === config.WEBHOOK_SENDER_ID
    ) {
        const data: string[] = message.content.split(":");
        // const email: string = data[0];
        // const name: string = data[1];
        let userTag: string = data[2];

        // updated for new username strings
        if (!userTag.includes("#")) userTag = userTag + "#0";

        // find the guild the user is in
        const guild: Guild | undefined = client.guilds.cache.get(
            config.GUILD_ID
        );
        if (!guild) {
            logVerificationErrorMessage(userTag, client);
            return;
        }

        // get list of all members of guild
        const memberList = await guild.members.fetch({});
        const userInGuild = memberList.find((u) => {
            return u.user.username + "#" + u.user.discriminator === userTag;
        });

        // choose automatic or manual verification if user is in guild cache
        userInGuild
            ? verifyUser(userInGuild.user, client, guild)
            : logVerificationErrorMessage(userTag, client);
    }
});

/**
 * Run corresponding commands when new user interaction has been created
 */
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

/**
 * Login the client using the bot token
 */
client.login(config.DISCORD_TOKEN);
