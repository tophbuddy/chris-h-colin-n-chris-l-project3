const express = require('express');

const route = express.Router();

const pokemons = [
    {name: "Pikachu", health: 100},
    {name: "Dinosaur", health: 50},
    {name: "Bob", health: 25},
];

// '/pokemon' + '/'
route.get('/', function(request, response) {

    const nameLength = request.query.maxNameLength;

    if (nameLength) {
        const pokemonLengthList = [];
        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].name.length < nameLength) {
                pokemonLengthList.push(pokemons[i])
            }
        }

        return response.send(pokemonLengthList);
    }

    response.status(200);

    return response.send(pokemons); 
})

route.post('/', function(request, response) {

    const name = request.body.name;

    if(!name) return response.send(401);

    const newPokemon = {
        name: name,
        health: 60,
    };

    pokemons.push(newPokemon);

    return response.send(200);
})

// '/pokemon' + '/pikachu'
route.get('/:pokemonName', function(request, response) {

    /* params = {
        pokemonName: 'pikachu'/'dinosaur',
    }
    */
    const nameOfPokemon = request.params.pokemonName;

    response.status(200);

    for (let i = 0; i < pokemons.length; i++ ) {
        if (pokemons[i].name.toLowerCase() === nameOfPokemon.toLowerCase()) {
            return response.send(true);

        }
    }

    return response.send(false);


})

module.exports = route;