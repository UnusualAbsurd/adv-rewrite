const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: 513,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'USER']
});


client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require('./config.json');

['event_handler', 'command_handler'].forEach(dir => {
   require(`./handlers/${dir}`)(client)
});



client.login(process.env.token)