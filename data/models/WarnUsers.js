const m = require('mongoose')

module.exports = m.model("user-warnings", new m.Schema({
    guildID: String,
    userID: String,
    reason: String,
    timestamp: String,
    authorID: String
}))