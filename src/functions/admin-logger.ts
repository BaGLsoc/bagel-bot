import { Channel, Client, TextChannel } from "discord.js";
import { config } from "../config";

/**
 * Logs a message pinging the user in
 * @param username as String
 * @param client as Discord Client object
 */
export const logVerificationErrorMessage = (
    username: string | null,
    client: Client
) => {
    const channel: Channel | undefined = client.channels.cache.get(
        config.LOGGING_CHANNEL_ID
    );
    if (!channel) return;
    (channel as TextChannel).send(username + " requires manual verification");
};
