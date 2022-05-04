const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function updateReview(newReview) {
    const filter = { _id: newReview._id, movieName: newReview.movieName, owner: newReview.owner};
    const update = {reviewText: newReview.reviewText};
    return ReviewModel.findOneAndUpdate(filter, update);  // -------------- will return item pre-update ---------------
}

function deleteReview(reviewID) {
    return ReviewModel.deleteOne({ _id: reviewID});
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
    updateReview,
    deleteReview
}