const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function updateReview(newReview) {
    const filter = { _id: newReview._id, movieID: newReview.movieID, owner: newReview.owner};
    const update = {reviewText: newReview.reviewText};
    return ReviewModel.findOneAndUpdate(filter, update);
}

function deleteReview(reviewID) {
    return ReviewModel.deleteOne({ _id: reviewID});
}

function getReviewsByMovieID(movieID) {
    return ReviewModel.find({
        movieID: movieID
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
    getReviewsByMovieID,
    getAllReviews,
    getReviewById,
    getReviewsByUsername,
    updateReview,
    deleteReview
}