const mongoose = require('mongoose');

const MovieSchema = require('../schema/movie.schema');

const MovieModel = mongoose.model("Movie", MovieSchema);

function createMovie(movie) {
    return MovieModel.create(movie);
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
}