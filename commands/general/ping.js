const { Command } = require("../../classes/command")

module.exports = new Command({
    name: "ping",
    category: "general",
    description: "Pong! 🏓",
    execute: async ({ interaction, client }) => {
        interaction.reply({ ephemeral: true, content: `Pong! \`${client.ws.ping}ms!\`` });
    }
})
