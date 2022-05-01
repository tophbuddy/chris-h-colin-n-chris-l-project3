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

function getAllMovies() {
    return MovieModel.find().exec();
}

function getMovieById(id) {
    return MovieModel.findById(id).exec();
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    getMoviesByDirector,
}