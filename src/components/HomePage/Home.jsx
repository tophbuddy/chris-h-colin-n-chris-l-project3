import React, {useEffect, useState, createContext} from 'react';
import './Home.css';
import Axios from 'axios';
import {Route, Routes} from "react-router-dom";

export const Context = createContext();

export default function Home() {

    const [movies, setMovies] = useState([]);

    function getMovies() {
        Axios.get('/api/movies')
            .then(function (response) {
                setMovies(response.data);
            })
    }

    useEffect(getMovies, []);
    const movieComponent = [];
    for (let movie of movies) {
        movieComponent.push(<div>
            <a href={'/home/' + movie._id}><h1>{movie.movieTitle}</h1></a>

            <h1>Room Count: {movie.director}</h1>
        </div>)

    }

    return (
        <div>

            <h1 className='homeTitle'>Movie Review App</h1>
            <h2 className='homeTitle'>{"By Chris Holzheu, Colin Nordquist, Christopher Lee"}</h2>
            <br></br>
            
            {movieComponent}

            <br></br>
        </div>
    );
}