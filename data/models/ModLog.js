const m = require('mongoose')

module.exports = m.model('modlogs-guild', new m.Schema({
    guildID: String,
    channelID: String,
}))