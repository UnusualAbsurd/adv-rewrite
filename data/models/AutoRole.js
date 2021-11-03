const m = require('mongoose');

module.exports = m.model("autoroles-guild", new m.Schema({
    guildID: String,
    roleID: String
}))