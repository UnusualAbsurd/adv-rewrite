const { MessageEmbed } = require("discord.js");
const { Command } = require("../../classes/command");
const db = require("../../data/models/WarnUsers");
const { errorMsg, successMsg } = require("../../functions/guild");

module.exports = new Command({
  name: "warn",
  description: `Warn System`,
  userPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "add",
      description: `Issue a warning to a user`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "user",
          description: "The user that you want to issue the warn to",
          type: "USER",
          required: true,
        },
        {
          name: "reason",
          description: "The reason why you want to warn the user",
          type: "STRING",
          required: false,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove a warning from a user",
      type: "SUB_COMMAND",
      options: [
        {
          name: "id",
          description: "The warn ID you want to remove from a user",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  execute: async ({ interaction, args, client }) => {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No Reason Provided";
    const id = interaction.options.getString("id");

    const [subcommand] = args;

    if (subcommand === "add") {
      const data = await db.find({
        guildID: interaction.guildID,
        userID: user.id,
      });
      if (data && data.length === 15)
        return errorMsg(
          interaction,
          `Maximum Warnings Amount Reached. Limit: \`15\``
        );
      else {
        new db({
          guildID: interaction.guildId,
          userID: user.id,
          reason,
          timestamp: Math.floor(Date.now() / 1000),
          authorID: interaction.user.id,
        }).save(function () {
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(
                  `<:greentick:905011429529235467> Successfully warned **${user.tag}**`
                ),
            ],
          });

          user.send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setAuthor(
                  `You have been warned in ${interaction.guild.name}`,
                  interaction.guild.iconURL({ dynamic: true })
                )
                .setDescription(
                  `Warned by: ${interaction.user.tag} (\`${interaction.user.id}\`)`
                )
                .setTimestamp(),
            ],
          });
        });
      }
    }

    if (subcommand === "remove") {
      const data = await db
        .findOne({ guildID: interaction.guildId, _id: id })
        .catch(() => {});

      if (!data)
        return errorMsg(
          interaction,
          `Couldn't find the warn with the ID of \`${id}\``
        );

      if (data) {
        let uu = await client.users.fetch(data.userID).catch(() => {});
        if (!uu) user = "Deleted User";

        data.delete(async function () {
          successMsg(
            interaction,
            `Successfully deleted **${uu.tag}** warning.`
          );
        });
      }
    }
  },
});
