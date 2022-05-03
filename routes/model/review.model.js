const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewsByMovie(movieTitle) {
    return ReviewModel.find({
        movieName: movieTitle
    }).exec();
}

function getReviewsByUsername(username) {
    return ReviewModel.find({
        owner: username
    }).exec();
}

function getAllReviews() {
    return ReviewModel.find().exec();
}

function getReviewById(id) {
    return ReviewModel.findById(id).exec();
}

module.exports = {
    createReview,
    getReviewsByMovie,
    getAllReviews,
    getReviewById,
    getReviewsByUsername,
}