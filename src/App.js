import React, { useEffect, useState } from 'react';

import Axios from 'axios';

function App() {

  const [homes, setHomes] = useState([]);
  const [newHomeInput, setNewHomeInput] = useState('');

  function getHomes() {
    Axios.get('/api/home')
      .then(function(response) {
        setHomes(response.data);
      })
  }

  function createNewHome() {
    if (!newHomeInput) return;

    Axios.post('/api/home', {
      address: newHomeInput,
    })
      .then(function(response) {
        setNewHomeInput('');
        getHomes();
      })
      .catch(function(error) {
        console.log(error);
      })

  }

  useEffect(getHomes, []);

  const homeComponent = [];
  for(let home of homes) {
    homeComponent.push(<div>
      <h1>{home.address}</h1>
      <h5>Room Count: {home.roomCount}</h5>
      </div>)

  }

  return (<div>
    {homeComponent}
    <input value={newHomeInput} onChange={e => setNewHomeInput(e.target.value)}>
    
    </input>
    <button onClick={createNewHome}>Add new home</button>
  </div>)

  // const [pokemons, setPokemons] = useState([]);
  // const [nameInputValue, setNameInputValue] = useState('');

  // async function getPokemon() {
  //     try {

  //     const pokemonResponse = await Axios.get('http://localhost:8000/pokemon');
  //       console.log("within function");
  //     setPokemons(pokemonResponse.data);
  //   } catch (e) {
      
  //   }

  // }

  // async function createPokemon() {
  //   console.log(nameInputValue)

  //   const response = await Axios.post('http://localhost:8000/pokemon', {
  //     name: nameInputValue,
  //   },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     }
  //   );

  //   setNameInputValue('');

  //   await getPokemon();

  // }

  // useEffect(async () => getPokemon(), []);
  // console.log(nameInputValue)

  // // Axios.get('http://localhost:8000/pokemon')
  // //   .then(function(response) {

  // //     setPokemons(response.data);

  // //   })
  // //   .catch(function(error) {

  // //     console.log(error);

  // //   })

  //   const pokemonComponent = [];
  //   for (let pokemon of pokemons) {
  //     const comp = 
  //     (<div>
  //       <h1>{pokemon.name}</h1>
  //       <h2>{pokemon.health}</h2>
  //     </div>)
  //     pokemonComponent.push(comp)
  //   }

  // return (
  //   <div><div>
  //       <label>Add New Pokemon Here</label>
  //       <input type="text" 
  //       onChange={(e) => {
  //         const name = e.target.value;
  //         setNameInputValue(e.target.value)
  //       }}
  //       value={nameInputValue}
  //       />
  //       <button onClick={() => createPokemon()} >
  //         Add new pokemone
  //       </button>
  //     </div>
      
  //     {pokemonComponent}</div>

  // );
}

export default App;


//

// https://www.tripadvisor.com/Tourism-g309679

// https://www.amazon.com/dp/B012CZ41ZA/
// localhost:8080/charmander

// https://www.amazon.com/dp/B012CZ41ZdasdsfA/

// https://www.redfin.com/FL/Miami/15343-SW-42nd-Ter-33185/home/43124798
// https://www.redfin.com/TX/Austin/3317-Scenic-Overlook-Dr-78734/home/44651734
// 