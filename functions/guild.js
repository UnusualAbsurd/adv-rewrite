const Discord = require('discord.js')
const modLog = require('../data/models/ModLog')

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
    modLog: async(interaction, guildID, embed, row) => {
       const data = await modLog.findOne({ guildID });
       if(!data) return;
       if(data) {
         const channel = interaction.guild.channels.cache.get(data.channelID);
         if(!channel) return;
         if(channel) {
          let components;
          if(!row) components = []; 
          if(row) components = [row];
           
           channel.send({ embeds: [embed], components })
         }
       }
    }
}