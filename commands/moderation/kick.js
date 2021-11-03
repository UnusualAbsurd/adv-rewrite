const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Command } = require("../../classes/command");
const { errorMsg, successMsg, modLog } = require("../../functions/guild");

module.exports = new Command({
    name: 'kick',
    category: 'moderation',
    description: "Kick a user from the server",
    userPermissions: ["KICK_MEMBERS"],
    options: [{ name: 'user', description: "The user that you want to kick", type: "USER", required: true }, { name: 'reason', description: "The reason why you want to kick this user", type: "STRING", required: false }],
    execute: async({ interaction, client }) => {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString("reason") || "No Reason Provided";

        if(!user.kickable) return errorMsg(interaction, `Couldn't kick <@!${user.id}>`);

        user.send({ embeds: [new MessageEmbed().setColor("RED").setAuthor(`You have been kicked from ${interaction.guild.name}`, interaction.guild.iconURL({dynamic: true})).setTimestamp()] }).catch((e) => {});
        successMsg(interaction, `Successfully kicked **${user.user.tag}**`).catch((e) => console.error(e))
        
        const reply = await interaction.fetchReply();

        await modLog(interaction, interaction.guildId, new MessageEmbed()
        .setColor("ORANGE")
        .setTimestamp()
        .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({dynamic: true}))
        .setDescription([
         `Member: \`${user.user.tag}\` (${user.user.id})`,
         'Action: **Kick**',
         `Reason: ${reason}`
        ].join("\n"))
        , new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("Jump to message")
              .setStyle("LINK")
              .setEmoji("🔗")
              .setURL(`${reply.url}`)
          )
        )

        // setTimeout(() => user.kick({ reason }).catch(() => {}), 500)

    }
})