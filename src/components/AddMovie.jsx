import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';

export default function AddMovie(props) {


    const navigate = useNavigate();
    const [movieTitle, setMovieTitle] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    function addNewMovie() {
        Axios.post('/api/movies', {movieTitle, director, genre, description})
            .then(response => {
                console.log("Added movie");
                console.log(response.data);
                navigate('/');

            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Add Movie</h1>
            <h4>
                Movie Title
            </h4>
            <input value={movieTitle} onChange={e => setMovieTitle(e.target.value)} />
            <h4>
                Name of Director
            </h4>
            <input value={director} onChange={e => setDirector(e.target.value)} />
            <h4>
                Genre
            </h4>
            <input value={genre} onChange={e => setGenre(e.target.value)} />
            <h4>
                Description
            </h4>
            <input value={description} onChange={e => setDescription(e.target.value)} />
            <br/>
            <button onClick={addNewMovie}>
                Add Movie
            </button>
        </div>

    )
} 