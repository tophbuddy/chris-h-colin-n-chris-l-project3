const express = require('express');

const HomeModel = require('./model/home.model');

const router = express.Router();

const homes = [
    {
        id: 1, 
        address: '2222 Evil St',
        roomCount: 10,
    },
    {
        id: 2,
        address: '444 Cape Cod, Boston',
        roomCount: 4,
    },
    {
        id: 3,
        address: '1234 USA Town',
        roomCount: 7,
    }
]

router.get('/', function(request, response) {

    return HomeModel.getAllHomes()
        .then(allHomes => {
            response.status(200).send(allHomes)
        })
        .catch(error => {
            response.status(400).send(error)
        })


    // const minRoomCount = request.query.minRoomCount;
    // if (minRoomCount) {
    //     const roomCountHomes = [];
    //     for (let i = 0; i < homes.length; i++) {
    //         if (homes[i].roomCount >= parseInt(minRoomCount)) {
    //             roomCountHomes.push(homes[i]);
    //         } 
    //     }
        
    //     response.status(200).send(roomCountHomes);

    // } else {
    //     response.status(200).send(homes);
    // }
    



})

router.get('/:homeId', function(request, response) {

    const homeId = request.params.homeId

    return HomeModel.getHomeById(homeId)
        .then(home => {
                response.status(200).send(home);
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

router.post('/', function(request, response) {
    const homeAddress = request.body.address;

    if (!homeAddress) {
        response.status(401).send("Missing home address argument")
    }

    const home = {
        address: homeAddress, 
    }

    return HomeModel.createHome(home)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;