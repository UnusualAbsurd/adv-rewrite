const Discord = require('discord.js')

module.exports = {
    /**
     * 
     * @param {Discord.CommandInteraction} interaction 
     * @param {String} message 
     * @returns 
     */
    errorMsg: (interaction, message) => {
      return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`<:redtick:905011488358543400> ${message}`)], ephemeral: true})
    },
    successMsg: (interaction, message) => {
      return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("GREEN").setDescription(`<:greentick:905011429529235467> ${message}`)], ephemeral: false})
    },
    modLog: async(guildId, embed) => {
      
    }
}