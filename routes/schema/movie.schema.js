const Schema = require('mongoose').Schema;

const MovieSchema = new Schema({
    address: String,
    roomCount: Number,
    owner: String,
    builtDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'movie',
})

module.exports = MovieSchema;