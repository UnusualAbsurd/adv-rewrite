const { Command } = require('../../classes/command')
const { MessageEmbed } = require('discord.js')
const filesize = require('filesize')
const os = require('os')

module.exports = new Command({
    name: 'info',
    category: "general",
    description: "Information of the bot",
    execute: async({ interaction, client }) => {
        
        let memory = process.memoryUsage()
        
        const mc = [];
        client.guilds.cache.forEach(guild => {
            mc.push(guild.memberCount)
        })

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setAuthor(`${client.user.tag} Information`, client.user.displayAvatarURL({dynamic: true}))
                .setColor("LIGHT_GREY")
                .setTimestamp()
                .setDescription([
               `<:nodejs:905052424211927041> Node Version: **${process.version}**`,
               `--`,
               `<:discordjs:905053565544976454> Discord.JS Version: **v${require('../../package.json').dependencies['discord.js']}**`,
               `--`,
               `<:Document_Folder:905054151103369256> Heap Used: **${filesize(memory.heapUsed)} / ${filesize(memory.heapTotal)}**`,
               `--`,
               `<:yb_think:899488915445137429> Load Average: **${os.loadavg().join(", ")}**`,
               `--`,
               '`Bot Info`',
               `Server Count: **${client.guilds.cache.size}**`,
               `All Users: **${mc.reduce((a, b) => a + b, 0)}**`
                ].join("\n"))
                .setFooter("Client ID: " + client.user.id)
            ]
        })
    }
})