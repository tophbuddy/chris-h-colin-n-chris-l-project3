const mongoose = require('mongoose');

const MovieSchema = require('../schema/movie.schema');

const MovieModel = mongoose.model("Movie", MovieSchema);

function createMovie(movie) {
    return MovieModel.create(movie);
}

function getMoviesByUsername(username) {
    return MovieModel.find({
        owner: username
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
    getMoviesByUsername,
}