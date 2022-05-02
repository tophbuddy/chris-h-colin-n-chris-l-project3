import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';


// http://localhost:3000/home/625fcade9c10f6ba1d10faeb
export default function MovieEntry(props) {

    const [movie, setMovie] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        Axios.get('/api/movies/' + params.movieId)
            .then(function(response) {
            setMovie(response.data);
            })
    },[]);

    if (!movie) {
        return (<div>
            Movie loading...
        </div>)
    }

    return (
        <div>
            <h2>
                Movie Image will be displayed here
            </h2>
            <h1>
                Movie Title: {movie.movieTitle} 
            </h1>
            <h2>
                Director: {movie.director}
            </h2>
            <h2>
                Release Date: {movie.releaseDate}
            </h2>
            <h2>
                Description: {movie.description}
            </h2>
            <h3>
                Reviews will be displayed here
            </h3>
        </div>
    )

}