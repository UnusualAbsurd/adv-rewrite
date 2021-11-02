const chalk = require('chalk')
const Discord = require('discord.js')

/**
* @param {Discord.Client} client
*/
module.exports = async(client) => {
  console.log(`[${chalk.greenBright("[Bot Status]")}] Logged in as ${chalk.bgBlueBright(`${client.user.tag}`)}`);
}