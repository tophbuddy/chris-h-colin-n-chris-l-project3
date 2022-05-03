import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AddMovie(props) {


    const navigate = useNavigate();
    const [movieTitle, setMovieTitle] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    function addNewMovie() {
        Axios.post('/api/movies', {movieTitle, director, genre, description, releaseDate})
            .then(response => {
                console.log("Added movie");
                console.log(response.data);
                navigate('/movie/' + response.data._id);

            })
            .catch(error => console.log(error));
    }

    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
            <Typography variant='h4'>Add Movie</Typography> 
            <TextField margin={'dense'} label={"Movie Title"} value={movieTitle} onChange={e => setMovieTitle(e.target.value)} />
            <TextField margin={'dense'} label={"Name of Director"} value={director} onChange={e => setDirector(e.target.value)} />
            <TextField margin={'dense'} label={"Genre"} value={genre} onChange={e => setGenre(e.target.value)} />
            <TextField margin={'dense'} label={"Description"} value={description} onChange={e => setDescription(e.target.value)} />
            <TextField margin={'dense'} label={"Release Date"}value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
            <Button size='large' onClick={addNewMovie}>
                Add Movie
            </Button>
        </div>
    </Box>
        

    )
} 