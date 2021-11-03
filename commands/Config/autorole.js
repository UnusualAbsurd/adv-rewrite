const { Command } = require("../../classes/command");
const db = require('../../data/models/AutoRole');
const { MessageEmbed } = require("discord.js")
const { errorMsg, successMsg } = require("../../functions/guild");

module.exports = new Command({
    name: 'autorole',
    description: "Autorole system",
    category: "config",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'add', description: "Add a role to the autorole system of the bot", type: "SUB_COMMAND",
            options: [{ name: 'role', description: "The role that you want to add to the servers autorole system", type: "ROLE", required: true }]
        },
        {
            name: 'remove', description: "Remove a role from the autorole system of the bot", type: "SUB_COMMAND",
            options: [{ name: 'role', description: "The role that you want to remove from the servers autorole system", type: "ROLE", required: true }]
        },
        {
            name: 'list', description: "List of the auto-roles in the server.", type: "SUB_COMMAND"
        }
    ],
    execute: async({ interaction, args }) => {

        const role = interaction.options.getRole(`role`);

        const [subcommand] = args;
        
        if(subcommand === 'add') {
    
    
            const check = await db.findOne({ guildID: interaction.guildId, roleID: role.id });
            if(check) return errorMsg(interaction, `You already have <@&${role.id}> in the servers auto-role system.`)

            const data = await db.find({ guildID: interaction.guildId });
            if(data && data.length === 5) return errorMsg(interaction, `Maximum AutoRole Roles Reached. Limit: \`5\``);
    
            new db({
                guildID: interaction.guildId,
                roleID: role.id
            }).save(function() {
                successMsg(interaction, `Successfully added <@&${role.id}> to the servers auto-role system`);
            })
    
        }
    
        if(subcommand === 'remove') {
           const data = await db.findOne({ guildID: interaction.guildId, roleID: role.id });
           if(!data) return errorMsg(interaction, `${role} isn't in the servers auto-role system.`);
           if(data) {
               data.delete(function() {
                   successMsg(interaction, `Successfully removed ${role} from the servers auto-role system.`)
               })
           }
        }

        if(subcommand === 'list') {
            const data = await db.find({ guildID: interaction.guildId });
            if(!data?.length) return errorMsg(interaction, `There are no autoroles for this server.`);
            
            let roles = [];
            data.forEach(r => roles.push(`<@&${r.roleID}>`))

            if(data) {
                interaction.reply({
                    embeds: [new MessageEmbed()
                     .setAuthor(`${interaction.guild.name} Auto Roles`, interaction.guild.iconURL({dynamic: true}))
                     .setColor('LIGHT_GREY')
                     .setDescription(roles.join(' '))
                    ]
                })
            }
        }
    }
})