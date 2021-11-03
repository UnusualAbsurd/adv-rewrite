const { Client, GuildMember } = require('discord.js');
const db = require('../../data/models/AutoRole');

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = async(client, member) => {

    const data = await db.find({ guildID: member.guild.id });
    
    if(!data?.length) return;


    data.forEach(async role => {
        member.roles.add(role.roleID).catch(() => {})
    })

}