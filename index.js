const chalk = require('chalk');
const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: 14023,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'USER']
});

const m = require('mongoose');
m.connect(`${process.env.mongodb}`)
.then(() => console.log(`${chalk.magentaBright('[MongoDB Connection]')} Connected`))
.catch((e) => console.error(`${chalk.redBright(`[MongoDB Connection]`)} ${e.stack}`))

client.slashCommands = new Discord.Collection();
client.config = require('./config.json');

['event_handler', 'command_handler'].forEach(dir => {
   require(`./handlers/${dir}`)(client)
});

process.on('unhandledRejection', error => {
    console.error(`${chalk.redBright(`[${error.name}]`)} ${error.stack}`)
})

client.on('error', error => {
    console.error(`${chalk.redBright(`[${error.name}]`)} ${error.stack}`)
})

client.login(process.env.token)