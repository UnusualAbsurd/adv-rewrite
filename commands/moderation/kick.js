const { MessageEmbed } = require("discord.js");
const { Command } = require("../../classes/command");
const { errorMsg, successMsg, modLog } = require("../../functions/guild");

module.exports = new Command({
    name: 'kick',
    description: "Kick a user from the server",
    userPermissions: ["KICK_MEMBERS"],
    options: [{ name: 'user', description: "The user that you want to kick", type: "USER", required: true }, { name: 'reason', description: "The reason why you want to kick this user", type: "STRING", required: false }],
    execute: async({ interaction, client }) => {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString("reason") || "No Reason Provided";

        if(!user.kickable) return errorMsg(interaction, `Couldn't kick <@!${user.id}>`);

        user.send({ embeds: [new MessageEmbed().setColor("RED").setAuthor(`You have been kicked from ${interaction.guild.name}`, interaction.guild.iconURL({dynamic: true})).setTimestamp()] }).catch((e) => {});
        successMsg(interaction, `Successfully kicked **${user.user.tag}**`).catch((e) => console.error(e))
        
        modLog(interaction, interaction.guildId, new MessageEmbed()
        .setColor("ORANGE")
        .setTimestamp()
        .setAuthor(`${}`)
        )

        setTimeout(() => user.kick({ reason }).catch(() => {}), 500)

    }
})