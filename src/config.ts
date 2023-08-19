import dotenv from "dotenv";

dotenv.config();

const {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    GUILD_ID,
    BOT_ID,
    WEBHOOK_CHANNEL,
    VERIFIED_ROLE_ID,
    LOGGING_CHANNEL_ID,
    WEBHOOK_SENDER_ID,
} = process.env;

if (
    !DISCORD_TOKEN ||
    !DISCORD_CLIENT_ID ||
    !GUILD_ID ||
    !BOT_ID ||
    !WEBHOOK_CHANNEL ||
    !VERIFIED_ROLE_ID ||
    !LOGGING_CHANNEL_ID ||
    !WEBHOOK_SENDER_ID
) {
    throw new Error("Missing environment variables");
}

/**
 * Wrapper for environment variables to make sure the
 * program functions as intended
 */
export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    BOT_ID,
    WEBHOOK_CHANNEL,
    GUILD_ID,
    VERIFIED_ROLE_ID,
    LOGGING_CHANNEL_ID,
    WEBHOOK_SENDER_ID,
};
