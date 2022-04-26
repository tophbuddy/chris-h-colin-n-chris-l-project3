const Schema = require('mongoose').Schema;

const MovieSchema = new Schema({
    movieTitle: String,
    director: String,
    genre: String,
    releaseDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'movie',
})

module.exports = MovieSchema;