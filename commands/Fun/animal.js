const { MessageAttachment } = require("discord.js");
const { Command } = require("../../classes/command");
const fetch = require('node-fetch').default;

module.exports = new Command({
    name: 'animal',
    description: "Get random images of animals",
    category: "fun",
    options: [
        { name: 'cat', description: "Get random images of a cat", type: "SUB_COMMAND"  },
        { name: "dog", description: "Get random images of a dog", type: "SUB_COMMAND" }
    ], 
    execute: async({ interaction, args }) => {
        
        const [subcommand] = args;

        if(subcommand === 'cat') {
            await fetch("https://api.thecatapi.com/v1/images/search", { method: "GET" })
            .then(response => response.json())
            .then((res) => {
                interaction.reply({ files: [new MessageAttachment(`${res[0].url}`, `cat.${res[0].url.split(".")[3]}`)] })
            })
        }

        if(subcommand === 'dog') {
            await fetch("https://api.thedogapi.com/v1/images/search", { method: "GET" })
            .then(response => response.json())
            .then((res) => {
                interaction.reply({
                    files: [new MessageAttachment(`${res[0].url}`, `dog.${res[0].url.split(".")[3]}`)]
                })
            })
        }
    }
})