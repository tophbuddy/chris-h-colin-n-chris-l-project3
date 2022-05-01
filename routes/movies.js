const express = require('express');
const auth_middleware = require("./middleware/auth_middleware");
const MovieModel = require("./model/movie.model");

const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return MovieModel.getMoviesByUsername(username)
        .then(allMovies => {
            response.status(200).send(allMovies)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/', function(request, response) {

    const username = request.username;

    return MovieModel.getAllMovies()
        .then(allMovies => {
            response.status(200).send(allMovies)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/:MovieId', function(request, response) {

    const movieId = request.params.movieId;

    return MovieModel.getMovieById(movieId)
        .then(movie => {
            response.status(200).send(movie);
        })
        .catch(error => {
            response.status(400).send(error);
        })
    // const homeId = request.params.homeId;
    // for(let i = 0; i < homes.length; i++) {
    //     if (homes[i].id === parseInt(homeId)) {
    //         response.status(200).send(homes[i]);
    //         return;
    //     }
    // }
    // return response.status(404).send('No home matches ID = ' + homeId);
})

router.post('/', auth_middleware, function(request, response) {
    //const username = request.username;
    const movieTitle = request.body.title;

    // require two of these fields, add other fields
    const movieDirector = request.body.director;
    const movieDate = request.body.date;
    const movieGenre = request.body.genre;
    const movieDescription = request.body.description;

    if ((Number(movieDirector) + Number(movieDate) + Number(movieGenre) + Number(movieDescription)) < 2) {
        response.status(401).send("Need at least 2 fields");
    }

    const movie = {
        movieTitle: movieTitle,
        director: movieDirector,
        genre: movieGenre,
        releaseDate: movieDate
    }

    return MovieModel.createMovie(movie)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;