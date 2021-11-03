import { ChatInputApplicationCommandData, Client, CommandInteraction, GuildMember, PermissionResolvable } from "discord.js";
export interface ExecuteOptions {
    client: Client;
    interaction: CommandInteraction & {
        member: GuildMember;
    };
    args: Array<string>;
}
export declare type ExecuteFunction = (options: RunOptiExecuteOptionsons) => any;
export declare type CommandOptions = {
    userPermissions?: PermissionResolvable[];
    category?: 'config' | 'general' | 'fun' | 'moderation' | 'misc';
    execute: ExecuteFunction;
} & ChatInputApplicationCommandData;
export declare class Command {
    constructor(commandOptions: CommandOptions);
}
