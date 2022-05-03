import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// http://localhost:3000/home/625fcade9c10f6ba1d10faeb
export default function MovieEntry(props) {

    const [movie, setMovie] = useState(undefined);
    // const [review, setReview] = useState('');
    const [reviewSet, setReviewSet] = useState([]);

    const params = useParams();

    // function getReviews() {
    //     Axios.get('/api/reviews' + movie.movieTitle)
    //         .then(function (response) {
    //             setReviewSet(response.data);
    //         })
    // }

    // function addNewReview() {
    //     Axios.post('/api/reviews', {reviewText, owner, movieName})
    //         .then(response => {
    //             console.log("Added review");
    //             console.log(response.data);
    //             navigate('/home');

    //         })
    //         .catch(error => console.log(error));
    // }

    useEffect(() => {
        Axios.get('/api/movies/' + params.movieId)
            .then(function(response) {
            setMovie(response.data);
            })
    },[]);

    // useEffect(getReviews, []);
    // const reviewComponent = [];
    // for (let review of reviews) {
    //     movieComponent.push(<div>
    //         <a href={'/movie/' + movie._id}><h1>{movie.movieTitle}</h1></a>

    //         <h1>Director: {movie.director}</h1>
    //     </div>)

    // }

    if (!movie) {
        return (<div>
            Movie loading...
        </div>)
    }

    return (
    <Card>
        <CardContent>
        <Typography>
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
                Movie Reviews
            </h3>
            {/* <input value={reviewText} onChange={e => setDescription(e.target.value)} />
            <br/>
            <button onClick={addNewReview}>
                Add Movie
            </button>
            <br/>
            {reviewComponent} */}
        </div>
        </Typography>
        </CardContent>
    </Card>
    )
}