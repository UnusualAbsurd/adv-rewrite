const Discord = require('discord.js');
const chalk = require('chalk')
const fs = require('fs');

/**
 * 
 * @param {Discord.Client} client 
 */
module.exports = async client => {
    const load_event = (dirs) => {
        const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));

        for(const file of eventFiles) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split(".")[0];

            console.log(`${chalk.yellowBright('[Bot Event]')} ${chalk.blueBright(event_name+'.'+file.split('.')[1])}`)

            client.on(event_name, event.bind(null, client))
        }
    };

    ['client', 'guild'].forEach(dir => load_event(dir));
}