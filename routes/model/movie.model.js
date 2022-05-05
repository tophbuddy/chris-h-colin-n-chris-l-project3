const mongoose = require('mongoose');

const MovieSchema = require('../schema/movie.schema');

const MovieModel = mongoose.model("Movie", MovieSchema);

function createMovie(movie) {
    return MovieModel.create(movie);
}

function updateMovie(newMovie) {
    const filter = { _id: newMovie._id};
    const update = {description: newMovie.description, 
        movieTitle: newMovie.movieTitle, 
        director: newMovie.director, 
        genre: newMovie.genre};
    return MovieModel.findOneAndUpdate(filter, update);  // -------------- will return item pre-update ---------------
}

function deleteMovie(movieID) {
    return MovieModel.deleteOne({ _id: movieID});
}

function getMoviesByDirector(director) {
    return MovieModel.find({
        director: director
    }).exec();
}

function getMoviesByGenre(genre) {
    return MovieModel.find({
        genre: genre
    }).exec();
}

function getAllMovies() {
    return MovieModel.find().exec();
}

function getMovieById(id) {
    return MovieModel.findById(id).exec();
}

module.exports = {
    createMovie,
    getMoviesByGenre,
    getAllMovies,
    getMovieById,
    getMoviesByDirector,
    updateMovie,
    deleteMovie
}