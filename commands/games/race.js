const { Command } = require('../../classes/command')
const arrayMove = require('array-move-item');


module.exports = new Command({
    name: "race",
    category: "game",
    description: "Start a race!",
    execute: async({interaction}) => {
        const modes = ['car', 'horse', 'bike']
        let gamemode = modes[Math.floor(Math.random() * modes.length)];

        let emos = {
            car: [
                '🏎️',
                '🚗',
                '🚙',
            ], horse: [
                '🐎',
            ], bike: [
                '🚲',
            ]
        };
        const userEmos = {};
        let winner;

        interaction.reply('🏁 Race has begun! Type \`join race\` to join the race! 🏁\nThe race will begin in 1 minute!')
        const filter = m => m.content.toLowerCase().startsWith('join race');
        const collector = interaction.channel.createMessageCollector({
            filter: filter,
            time: 5000
        });
        var participants = [];
        collector.on('collect', m => {
            if (!participants.includes(m.author.id)) {
                if (participants.length >= 25) return m.channel.send({ content: 'Maximum 25 people can join a race'})
                participants.push(m.author.id);
                userEmos[`<@${m.author.id}>`] = emos[gamemode][Math.floor(Math.random() * emos[gamemode].length)];
                m.channel.send(`<@${m.author.id}> joined`)
            }
        });

        collector.on('end', async () => {
            if (participants.length < 2) {
                return interaction.channel.send({ content: 'There is not enough people sorry'})
            }
            participants = participants.map(item => {
                return '<@' + item + '>';
            })
            const players = participants.join(', ')
            interaction.channel.send(` ${participants.length} people joined. Participants - ${players}`)

            var race_msg = []
            participants.forEach(player => {
                race_msg.push(`🏁 ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ${userEmos[player]} ${player}`)
            })
            let racemsg = race_msg.join('\n')
            let e = racemsg
            const msg = await interaction.channel.send(racemsg)
            const interval = setInterval(function () {
                e = move(e, interval)
                interaction.channel.messages.edit(msg.id, e)
            }, 3000)

            const move = function (racemsg, interval) {
                var race_msg = racemsg.split("\n")

                if (!race_msg.every(e => {
                    if (e.includes('🚩')) return true
                })) {
                    race_msg = race_msg.map(thing => {
                        if (!thing.includes('🚩')) {

                            const movement_number = Math.round(Math.random() * 3)
                            var _obj = thing.split(' ')
                            objectindex = _obj.indexOf(userEmos[_obj[13]])
                            if (objectindex - movement_number < 2) {
                                _obj = arrayMove(_obj, objectindex, 1)
                                if (!winner) winner = _obj[13]
                                return `🚩 ${_obj.slice(1).join(' ')}`

                            }
                            _obj = arrayMove(_obj, objectindex, objectindex - movement_number)
                            _obj = _obj.join(' ')

                            return _obj

                        } else return thing
                    })
                    return race_msg.join('\n')
                } else {
                    clearInterval(interval)
                    interaction.channel.send(`🚩 Race Results! 🚩\nWinner: ${winner}`)
                }
            }


        });
    }
})