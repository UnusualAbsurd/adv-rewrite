const Discord = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob)

/**
 * 
 * @param {Discord.Client} client 
 */
module.exports = async client => {
  
    const applicationCommands = [];
    const appFiles = await globPromise(`${process.cwd()}/commands/*/*.js`);

    appFiles.map((value) => {
        const file = require(value);
        if(!file?.name) return;
        
        client.slashCommands.set(file.name, file);

        if(['MESSAGE', "USER"].includes(file.type)) delete file.description;
        applicationCommands.push(file)
    })


    client.on('ready', async() => {
        await client.guilds.cache.get(`${client.config.testGuild}`).commands.set(applicationCommands)
    })

}