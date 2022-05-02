const Schema = require('mongoose').Schema;

const MovieSchema = new Schema({
    movieTitle: String,
    director: String,
    genre: String,
    description: String,
    releaseDate: {
        type: Date,
        default: Date.now,
    },
    reviews: [{
        review: {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    }]
}, {
    collection: 'movie',
})

module.exports = MovieSchema;