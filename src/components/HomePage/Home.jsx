import React, {useEffect, useState, createContext} from 'react';
import './Home.css';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function Home() {

    const [movies, setMovies] = useState([]);

    function getMovies() {
        Axios.get('/api/movies/allMovies')
            .then(function (response) {
                setMovies(response.data);
            })
    }

    useEffect(getMovies, []);
    const movieComponent = [];
    for (let movie of movies) {
        movieComponent.push(
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography>
                    <Link className='movieTitle' to={'/movie/movieID/' + movie._id}><h2>{movie.movieTitle}</h2></Link>
                    <h3>Director: {movie.director}</h3>
                </Typography>
                </CardContent>
            </Card>)

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