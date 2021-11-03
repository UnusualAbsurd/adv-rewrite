const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");
const ms = require("ms");
const { Command } = require("../../classes/command");


module.exports = new Command({
    name: "help",
    category: "general",
    description: "List of commands for the bot",
    execute: async({ interaction, client }) => {
       let options = [
           {
               label: "Server Configuration Commands",
               description: "List of the bots server configuration commands.",
               value: "config",
               emoji: "<:pastelcrown:905310483945508866>"
           },
           {
               label: "Moderation Commands",
               description: "List of the bots moderation commands.",
               value: 'moderation',
               emoji: "<:pastelstaff:905310494305435648>"
           },
           {
               label: "Misc Commands",
               description: "List of the bots misc commands",
               value: "misc",
               emoji: "<:pastelverified:905310494297042944>",
           },
           {
               label: "Game Commands",
               description: "List of the bots game commands",
               value: 'game',
               emoji: "<:pastelshield:905310484968906772>"
           },
           {
            label: "General Commands",
            description: "List of the bots general commands",
            value: 'general',
            emoji: "<:pastelbot:905310494091522059>"
           }
       ]

       const row = new MessageActionRow().addComponents(new MessageSelectMenu()
       .addOptions(options)
       .setPlaceholder("Select the category")
       .setCustomId("selection")
       .setMaxValues(1)
       )

       interaction.reply({
           embeds: [new MessageEmbed().setColor('LIGHT_GREY')
           .setTimestamp()
           .setAuthor(`${client.user.username} Help Panel`, client.user.displayAvatarURL({dynamic: true}))
           .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
           .addField("`General Information`", [
               `Total Commands: **${client.slashCommands.size}**`,
               `Total Servers: **${client.guilds.cache.size}**`,
               `Uptime: **${ms(client.uptime, { long: false })}**`
           ].join('\n'), true)
           .addField(`\`Links\``, [
            `Invites: [[ Default ]](${client.config.invite.default}) | [[ Admin ]](${client.config.invite.admin})`
           ].join("\n"), true)
           ], components: [row]
       })
    }
})