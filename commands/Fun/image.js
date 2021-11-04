const { Command } = require("../../classes/command");
const fetch = require('node-fetch').default;
const { errorMsg } = require("../../functions/guild");
const { MessageAttachment } = require('discord.js')

module.exports = new Command({
  name: 'google',
  description: "Interact with the google api!",
  options: [{ name: 'image', description: "Get an image from google", type: "SUB_COMMAND", options: [{name: 'query', description: "The image query that you want to search as", type: "STRING", required: true}] }],
  execute: async({ interaction, args }) => {
      const query = interaction.options.getString("query");

    const [subcommand] = args;
    if(subcommand === 'image') {
        try{
            await fetch(`https://customsearch.googleapis.com/customsearch/v1?q=${query}&cx=${process.env.cx}&key=${process.env.google}&searchType=image`, { method: "GET" })
            .then(response => response.json())
            .then((res) => {
                if(!res.items?.length) return errorMsg(interaction, "No results found");
    
                const random = Math.floor(Math.random() * res.items.length);
                interaction.reply({
                    content: `${res.items[random].link}`
                })
            })
          }
          catch(e) {
              errorMsg(interaction, `${e.message}`)
          }
    }
  }
})