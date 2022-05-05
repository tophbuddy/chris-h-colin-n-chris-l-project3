const express = require('express');
const auth_middleware = require("./middleware/auth_middleware");
const ReviewModel = require("./model/review.model");

const router = express.Router();

router.get('/getReviewsByMovieID/:movieID', function(request, response) {

    const id = request.params.movieID;

    return ReviewModel.getReviewsByMovieID(id)
        .then(reviews => {
            response.status(200).send(reviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/getByReviewID/:reviewId', function(request, response) {

    const reviewId = request.params.reviewId;

    return ReviewModel.getReviewById(reviewId)
        .then(review => {
            response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.get('/getByUsername/', function(request, response) {

    const username = request.body.username;

    return ReviewModel.getReviewsByUsername(username)
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})


router.post('/', function(request, response) {

    const reviewText = request.body.reviewText;
    // const reviewId = request.body.reviewId;
    const reviewMovieID = request.body.curMovieID;
    const reviewOwner = request.body.username;
    const reviewCreationDate = request.body.date;

    const review = {
        reviewText: reviewText,
        movieID: reviewMovieID,
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

router.put('/:reviewID', function(request, response) {
    
    const newReviewText = request.body.submitText;
    const reviewID = request.params.reviewID;
    const reviewOwner = request.body.username;
    const reviewMovieID = request.body.curMovieID;
    const reviewCreationDate = request.body.date;

    const updatedReview = {
        _id : reviewID,
        reviewText: newReviewText,
        owner: reviewOwner,
        movieID: reviewMovieID,
        creationDate: reviewCreationDate
    }

    return ReviewModel.updateReview(updatedReview)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.delete('/:reviewID', function(request, response) {
    
    const reviewID = request.params.reviewID;

    return ReviewModel.deleteReview(reviewID)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

module.exports = router;