const Schema = require('mongoose').Schema;

const HomeSchema = new Schema({
    address: String,
    roomCount: Number,
    builtDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'home',
})

module.exports = HomeSchema;