const mongoose = require('mongoose');

const HomeSchema = require('../schema/home.schema');

const HomeModel = mongoose.model("Home", HomeSchema);

function createHome(home) {
    return HomeModel.create(home);
}

function getAllHomes() {

    return HomeModel.find().exec();

}

function getHomeById(id) {

    return HomeModel.findById(id).exec();

}
