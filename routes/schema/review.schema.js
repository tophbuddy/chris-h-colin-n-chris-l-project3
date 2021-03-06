const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    reviewText: String,
    owner: String,
    movieID: String,
    creationDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'reviews',
})

module.exports = ReviewSchema;