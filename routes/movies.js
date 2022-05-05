const express = require('express');
const auth_middleware = require("./middleware/auth_middleware");
const MovieModel = require("./model/movie.model");

const router = express.Router();

router.get('/allMovies', function(request, response) {

    return MovieModel.getAllMovies()
        .then(allMovies => {
            response.status(200).send(allMovies)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/movieID/:movieId', function(request, response) {

    const movieId = request.params.movieId;

    return MovieModel.getMovieById(movieId)
        .then(movie => {
            response.status(200).send(movie);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.get('/genre/:genre', auth_middleware, function(request, response) {

    const movieGenre = request.params.genre;

    return MovieModel.getMoviesByGenre(movieGenre)
        .then(allMovies => {
            response.status(200).send(allMovies)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.post('/', function(request, response) {
    //const username = request.username;
    const title = request.body.movieTitle;

    // require two of these fields, add other fields
    const movieDirector = request.body.director;
    const movieDate = request.body.date;
    const movieGenre = request.body.genre;
    const movieDescription = request.body.description;

    if ((Number(movieDirector) + Number(movieDate) + Number(movieGenre) + Number(movieDescription)) < 2) {
        response.status(401).send("Need at least 2 fields");
    }

    const movie = {
        movieTitle: title,
        director: movieDirector,
        genre: movieGenre,
        description: movieDescription,
        releaseDate: movieDate,
    }

    return MovieModel.createMovie(movie)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

router.put('/:movieID', function(request, response) {
    
    const newMovieDescription = request.body.description;
    const movieID = request.params.movieID;
    const movieTitle = request.body.movieTitle;
    const movieDirector = request.body.director;
    const movieGenre = request.body.genre;
    const movieCreationDate = request.body.date;

    const updatedMovie = {
        _id : movieID,
        movieTitle: movieTitle,
        movieGenre: movieGenre,
        director: movieDirector,
        description: newMovieDescription,
        releaseDate: movieCreationDate
    }

    return MovieModel.updateMovie(updatedMovie)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.delete('/:movieID', function(request, response) {
    
    const movieID = request.params.movieID;

    return MovieModel.deleteMovie(movieID)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

module.exports = router;