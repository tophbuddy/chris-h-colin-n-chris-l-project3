import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateReview(props) {


    const navigate = useNavigate();
    const [movieTitle, setMovieTitle] = useState('');
    const [director, setDirector] = useState('');

    function addReview() {
        Axios.post('/api/movies', {movieTitle, director})
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
            <h5>
                Movie Title
            </h5>
            <input value={movieTitle} onChange={e => setMovieTitle(e.target.value)} />
            <h5>
                Name of Director
            </h5>
            <input value={director} onChange={e => setDirector(e.target.value)} />
            <button onClick={addNewMovie}>
                Add Movie
            </button>
        </div>

    )
} 