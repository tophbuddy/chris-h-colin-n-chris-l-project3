const express = require('express');

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

    const minRoomCount = request.query.minRoomCount;
    if (minRoomCount) {
        const roomCountHomes = [];
        for (let i = 0; i < homes.length; i++) {
            if (homes[i].roomCount >= parseInt(minRoomCount)) {
                roomCountHomes.push(homes[i]);
            } 
        }
        
        response.status(200).send(roomCountHomes);

    } else {
        response.status(200).send(homes);
    }
    



})

router.get('/:homeId', function(request, response) {

    const homeId = request.params.homeId;

    for(let i = 0; i < homes.length; i++) {
        if (homes[i].id === parseInt(homeId)) {
            response.status(200).send(homes[i]);
            return;
        }
    }

    return response.status(404).send('No home matches ID = ' + homeId);
})

router.post('/', function(request, response) {
    const homeAddress = request.body.address;

    const newestHome = homes[homes.length - 1];
    const nextHomeId = newestHome.id + 1;

    homes.push({
      address: homeAddress, 
      id: nextHomeId,  
    })

    response.status(200).send(homes[homes.length - 1]);

});

module.exports = router;