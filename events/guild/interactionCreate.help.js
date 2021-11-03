const {
  MessageEmbed,
  Client,
  Interaction,
  SelectMenuInteraction,
} = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports = async (client, interaction) => {
  const config_embed = new MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp()
    .setAuthor(
      `${client.user.username} Server Configuration Commands`,
      client.user.displayAvatarURL()
    );

  const mod_embed = new MessageEmbed()
    .setColor("LUMINOUS_VIVID_PINK")
    .setTimestamp()
    .setAuthor(
      `${client.user.username} Moderation Commands`,
      client.user.displayAvatarURL()
    );

  const misc_embed = new MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setAuthor(
      `${client.user.username} Misc Commands`,
      client.user.displayAvatarURL()
    );

  const game_embed = new MessageEmbed()
    .setColor("ORANGE")
    .setTimestamp()
    .setAuthor(
      `${client.user.username} Game Commands`,
      client.user.displayAvatarURL()
    );

  const general_embed = new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setAuthor(
      `${client.user.username} General Commands`,
      client.user.displayAvatarURL()
    );

  const config_array = [];
  const mod_array = [];
  const misc_array = [];
  const game_array = [];
  const general_array = [];

  client.slashCommands.forEach((command) => {
    switch (command.category) {
      case "config":
        config_array.push(command);
        break;
      case "moderation":
        mod_array.push(command);
        break;
      case "misc":
        misc_array.push(command);
        break;
      case "game":
        game_array.push(command);
        break;
      case "general":
        general_array.push(command);
        break;
    }
  });

  config_array.forEach((cmd) =>
    config_embed.addField(`/${cmd.name}`, `> ${cmd.description}`)
  );
  mod_array.forEach((cmd) =>
    mod_embed.addField(`/${cmd.name}`, `> ${cmd.description}`)
  );
  misc_array.forEach((cmd) =>
    misc_embed.addField(`/${cmd.name}`, `> ${cmd.description}`)
  );
  game_array.forEach((cmd) =>
    game_embed.addField(`/${cmd.name}`, `> ${cmd.description}`)
  );
  general_array.forEach((cmd) =>
    general_embed.addField(`/${cmd.name}`, `> ${cmd.description}`)
  );

  /**
   *
   * @param {SelectMenuInteraction} menu
   */
  function select(menu) {
    switch (menu.values[0]) {
      case "config":
        menu.reply({ ephemeral: true, embeds: [config_embed] });
        break;
      case "moderation":
        menu.reply({ ephemeral: true, embeds: [mod_embed] });
        break;
      case "misc":
        menu.reply({ ephemeral: true, embeds: [misc_embed] });
        break;
      case "game":
        menu.reply({ ephemeral: true, embeds: [game_embed] });
        break;
      case "general":
        menu.reply({ ephemeral: true, embeds: [general_embed] });
        break;
    }
  }

  if (!interaction.isSelectMenu()) return;
  if (interaction.isSelectMenu()) {
    if (interaction.message.author.id !== client.user.id) return;

    if (interaction.customId === "selection") {
      select(interaction);
    }
  }
};
