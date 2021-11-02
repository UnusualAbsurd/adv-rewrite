const { Command } = require('../../classes/command')
const { CommandInteraction, MessageEmbed } = require('discord.js');
const { errorMsg, successMsg } = require('../../functions/guild');


module.exports = new Command({
    name: 'ban',
    userPermissions: ['BAN_MEMBERS'],
    description: "Ban System",
    options: [
        { name: "add", description: "Add a user to the server ban list", type: "SUB_COMMAND",
         options: [{ name: "user", description: "The user that you want to ban", type: "USER", required: true }, {name: "reason", description: "The reason why you want to ban this user", type: "STRING", required: false}]
        },
        {
         name: 'soft', description: "Bans a user and then immidietaly unban the user", type: "SUB_COMMAND",
         options: [{ name: "user", description: "The user that you want to ban", type: "USER", required: true }, {name: "reason", description: "The reason why you want to ban this user", type: "STRING", required: false}]
        },
        {
         name: 'remove', description: "Unban a user from the server", type: "SUB_COMMAND",
         options: [{ name: 'user_id', description: "The ID of the user that you want to ban!", type: "STRING", required: true}, {name: "reason", description: "The reason why you want to unban this user", type: "STRING", required: false }]
        }
    ],
    execute: async({ interaction, args, client }) => {
        const user = interaction.options.getMember("user");
        const reason = interaction.options.getString('reason') || "No Reason Provided";
        const id = interaction.options.getString('user_id')

        const [subcommand] = args;
    
        if(subcommand === 'add') {

            if(!user.bannable) return errorMsg(interaction, `Couldn't ban ${user}`);
            
            user.send({ embeds: [new MessageEmbed().setColor("RED").setAuthor(`You have been banned from ${interaction.guild.name}`, interaction.guild.iconURL({dynamic: true})).setTimestamp()] }).catch((e) => {});
            successMsg(interaction, `Successfully banned **${user.user.tag}**`).catch((e) => console.error(e))
            
            setTimeout(() => user.ban({ reason }).catch(() => {}), 500)
        } 

        if(subcommand === 'soft') {
            if(!user.bannable) return errorMsg(interaction, `Couldn't ban ${user}`);
            
            user.send({ embeds: [new MessageEmbed().setColor("RED").setAuthor(`You have been soft-banned from ${interaction.guild.name}`, interaction.guild.iconURL({dynamic: true})).setTimestamp()] }).catch(() => {});
            successMsg(interaction, `Successfully soft-banned **${user.user.tag}**`).catch(() => {})
            
            setTimeout(() => user.ban({ reason }).catch(() => {}), 500)
            setTimeout(() => interaction.guild.members.unban(user.id).catch(() => {}), 1000)
        }

        if(subcommand === 'remove') {
           if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `Missing Permissions: \`ADMINISTRATOR\``, ephemeral: true })
           else {
              const unbanned_user = await client.users.fetch(`${id}`).catch(() => {})
             interaction.guild.members.unban(id).then((e) => successMsg(interaction, `Successfully unbanned **${unbanned_user.tag}**`)).catch((e) => errorMsg(interaction, e.message))
           }
        }
    }
})