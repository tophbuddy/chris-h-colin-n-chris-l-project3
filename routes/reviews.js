const express = require('express');
const auth_middleware = require("./middleware/auth_middleware");
const ReviewModel = require("./model/review.model");

const router = express.Router();

router.get('/', function(request, response) {

    return ReviewModel.getAllReviews()
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/:ReviewId', function(request, response) {

    const reviewId = request.params.reviewId;

    return ReviewModel.getReviewById(reviewId)
        .then(review => {
            response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.get('/:username', auth_middleware, function(request, response) {

    const username = request.username;

    return ReviewModel.getReviewsByUsername(username)
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})


router.post('/', auth_middleware, function(request, response) {

    const reviewText = request.body.text;
    const reviewId = request.body.reviewId;
    const reviewOwner = request.body.owner;
    const reviewCreationDate = request.body.creationDate;

    const review = {
        reviewText: reviewText,
        reviewId: reviewId,
        owner: reviewOwner,
        creationDate: reviewCreationDate
    }

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;