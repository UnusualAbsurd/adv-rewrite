const { MessageEmbed } = require('discord.js');
const { Command } = require('../../classes/command');
const db = require('../../data/models/WarnUsers');

module.exports = new Command({
    name: "warnings",
    description: "Get the list of warnings from a user",
    options: [{ name: 'user', description: "The user that you want to check the warnings", type: "USER", required: true }],
    execute: async({ interaction }) => {
        const user = interaction.options.getUser("user") || interaction.user;
        const data = await db.find({ guildID: interaction.guildId, userID: user.id });
        if(!data?.length) return interaction.reply({ content: `<@!${user.id}> does not having any warnings in this server`, ephemeral: true });

        if(data) {
            const warnings =  data.map(w => {
                const moderator = interaction.guild.members.cache.get(`${w.authorID}`).user || `${client.users.fetch(w._id)}`;

                return [
                    `ID: \`${w._id}\` | Moderator: \`${moderator.tag}\``,
                    `Reason: ${w.reason} - <t:${w.timestamp}:D>`
                ].join("\n")
            }).join("\n\n");

            const embed = new MessageEmbed()
            .setColor(user.accentColor || 'LIGHT_GREY')
            .setAuthor(`${user.tag} Warnings`, user.displayAvatarURL({dynamic: true}))
            .setDescription(await warnings)
            .setTimestamp()

            interaction.reply({ embeds: [embed] })
        }
    }
})