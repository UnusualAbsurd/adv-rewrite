const Discord = require('discord.js')

/**
* @param {Discord.Client} client
* @param {Discord.Interaction} interaction
*/
module.exports = async(client, interaction) => {
 
    if(interaction.isButton()) {
        if(interaction.message.author.id !== client.user.id) return;
        if(interaction.customId === 'roles') {

            const user = await interaction.guild.members.fetch(`${interaction.message.embeds[0].footer.text}`);
            if(!user) return interaction.reply({ ephemeral: true, content: `Member left the server, couldn't fetch roles.` });
              
            if(user) {

                let roles = user.roles.cache
                .sort((a, b) => a.position - b.position)
                .map((role) => role.toString())
                .slice(0, -1) || 
                "No Custom Server Roles";

                const roleEmbed = new Discord.MessageEmbed()
                .setColor(user.user.accentColor || user.roles.highest.color || 'LIGHT_GREY')
                .setTimestamp()
                .setAuthor(`${user.user.tag} Roles`, user.displayAvatarURL({dynamic: true}))
                .setDescription(`${roles.join(" ")}`)

                interaction.reply({ ephemeral: true, embeds: [roleEmbed] })
            
            }

            interaction.guild.members.cache.filter(m => !m.user.bot).size

        }
    }

} 