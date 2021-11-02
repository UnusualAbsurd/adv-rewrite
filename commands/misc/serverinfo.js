const { MessageEmbed } = require('discord.js');
const { Command } = require('../../classes/command')

module.exports = new Command({
    name: "serverinfo",
    description: "Get information of a server",
    execute: async({ interaction, client }) => {
        const guild = interaction.guild;
    const owner = await guild.fetchOwner();

    const embed = new MessageEmbed()
      .setColor(guild.roles.highest.color)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true }) || null)
      .addField(
        "General Information",
        [
          "\n",
          `Owner: <@!${owner.id}> (\`${owner.id}\`)`,
          `Server Creation: <t:${Math.floor(
            guild.createdTimestamp / 1000
          )}:D> [<t:${Math.floor(guild.createdTimestamp / 1000)}:R>]`,
          `[Server Icon](${guild.iconURL({ dynamic: true, size: 512 })})`,
        ].join("\n")
      )
      .addField(
        "Server Items",
        [
          `\n`,
          `Roles: **${guild.roles.cache.size}**`,
          `Highest Role: <@&${guild.roles.highest.id}>`,
          `Text Channels: **${
            guild.channels.cache.filter((ch) => ch.isText()).size
          }**`,
          `Voice Channels: **${
            guild.channels.cache.filter((ch) => ch.isVoice()).size
          }**`,
          `Thread Channels: **${
            guild.channels.cache.filter((ch) => ch.isThread()).size
          }**`,
        ].join("\n")
      )
      .addField("Members", [`Total Members: ${guild.memberCount}`, `Normal Users: ${interaction.guild.members.cache.filter(m => !m.user.bot).size}`, `Bots: ${interaction.guild.members.cache.filter(b => b.user.bot).size}`].join("\n"))
      .setFooter(
        "Server ID: " + guild.id,
        guild.iconURL({ dynamic: true }) || null
      );

    interaction.reply({ embeds: [embed] });
    }
})