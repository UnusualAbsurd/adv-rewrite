const Discord = require('discord.js')

/**
* @param {Discord.Client} client
* @param {Discord.Interaction} interaction
*/
module.exports = async(client, interaction) => {

    if(interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if(!command) return;

        const args = [];

        for(let options of interaction.options.data) {
            if (options.type === "SUB_COMMAND") {
                if (options.name) args.push(options.name);
                options.options?.forEach((x) => {
                    if (x.value) args.push(x.value)
                })
            } else if (options.value) args.push(options.value);
        }

        if(command) {
            if(command?.userPermissions && command?.userPermissions?.length) {
                const perm = [];
                for(const permission of command.userPermissions) {
                    perm.push(permission)
                }

                if(!interaction.member.permissions.has(perm)) return interaction.reply({ ephemeral: true, content: `Missing Permissions: \`${perm.join(", ")}\`` })
                else await command.execute({ interaction, client, args });
            } else await command.execute({ interaction, client, args })
        }
    }

}