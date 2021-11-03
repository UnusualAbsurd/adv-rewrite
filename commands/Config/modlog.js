const { Command } = require("../../classes/command");
const db = require('../../data/models/ModLog');
const { successMsg, errorMsg } = require("../../functions/guild");

module.exports = new Command({
    name: "modlog",
    category: 'config',
    description: "Set the mod log channel for the server",
    userPermissions: ["MANAGE_GUILD"],
    options: [{ name: 'channel', description: "The channel that you want to set the mod log as", type: "CHANNEL", channelTypes: ['GUILD_TEXT'], required: true }],
    execute: async({ interaction }) => {
        const channel = interaction.options.getChannel("channel");

        const data = await db.findOne({ guildID: interaction.guildId });
        if(!data) new db({ guildID: interaction.guildId, channelID: null }).save();
        if(data.channelID === channel.id) return errorMsg(interaction, `You alreadu have ${channel} as the moderation log channel.`)


        data.channelID = channel.id;
        data.save(function() {
            successMsg(interaction, `Successfully set ${channel} as the moderation log channel.`)
        })

    }
})