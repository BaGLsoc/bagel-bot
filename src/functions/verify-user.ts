import { Client, Guild, User } from "discord.js";
import { config } from "../config";
import { logVerificationErrorMessage } from "./admin-logger";

/**
 * verifies user by adding verified role.
 * @param user as Discord User Object
 * @param client as Discord Client Object
 */
export const verifyUser = async (user: User, client: Client, guild: Guild) => {
    try {
        const member = guild.members.cache.get(user.id);
        if (!member) throw new Error("invalid member");

        // Remove all existing roles
        await member.roles.set([]);

        const role = guild.roles.cache.get(config.VERIFIED_ROLE_ID);
        if (!role) throw new Error("invalid role ID");

        // add verified role
        await member.roles.add(role);
    } catch (e) {
        console.log(e);
        logVerificationErrorMessage(user.username, client);
    }
};
