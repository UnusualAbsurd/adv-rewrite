const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Command } = require("../../classes/command");

module.exports = new Command({
  name: "userinfo",
  category: 'misc',
  description: "Get information of a user!",
  options: [
    {
      name: "user",
      description: "The user that you want to view the information as",
      type: "USER",
      required: false,
    },
  ],
  execute: async ({ interaction, client }) => {

    const user = interaction.options.getMember("user") || interaction.member;

    const embed = new MessageEmbed()
      .setColor(
        user.user.accentColor || user.roles.highest.color || "LIGHT_GREY"
      )
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setAuthor(
        `${user.user.tag}`,
        user.user.displayAvatarURL({ dynamic: true })
      )
      .addField(
        `User`,
        `<@!${user.id}> (\`${user.id}\`) - [Avatar](${user.displayAvatarURL({
          dynamic: true,
        })})`
      )
      .addField(
        "Account Creation",
        `<t:${Math.floor(
          user.user.createdTimestamp / 1000
        )}:D>\n[ <t:${Math.floor(user.user.createdTimestamp / 1000)}:R> ]`,
        true
      )
      .addField(
        "Joined Date",
        `<t:${Math.floor(user.joinedTimestamp / 1000)}:D>\n[ <t:${Math.floor(
          user.joinedTimestamp / 1000
        )}:R> ]`,
        true
      )

  
      .setFooter(user.id);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Show Roles")
        .setCustomId("roles")
        .setStyle("SECONDARY"),
    ]);

    interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
});
