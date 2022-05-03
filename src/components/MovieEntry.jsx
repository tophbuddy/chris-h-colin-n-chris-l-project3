import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Context } from "../App";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


// http://localhost:3000/home/625fcade9c10f6ba1d10faeb
export default function MovieEntry(props) {

    const {username, loggedIn} = useContext(Context);
    const [movie, setMovie] = useState(undefined);
    const [reviewText, setReviewText] = useState('');
    const [curMovieTitle, setCurMovieTitle] = useState('');
    const [reviewSet, setReviewSet] = useState([]);

    const params = useParams();

    // useEffect(function () {
    //     Axios.get('/api/user/isLoggedIn')
    //         .then(response => setUsername(response.data.username))
    //         .catch(error => console.log("User is not logged in"));
    // }, [])

    function getReviews() {
        Axios.get('/api/reviews/getByMovie/' + curMovieTitle)
            .then(function (response) {
                setReviewSet(response.data);
            })
    }

    function addNewReview() {
        if (loggedIn) {
            Axios.post('/api/reviews', {reviewText, username, curMovieTitle})
                .then(response => {
                    console.log("Added review");
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        } else {
            console.log("User must be logged in to submit review");
        }
    }

    useEffect(() => {
        Axios.get('/api/movies/movieID/' + params.movieId)
            .then(function(response) {
            setMovie(response.data);
            setCurMovieTitle(movie.movieTitle);
            })
    },[]);

    useEffect(getReviews, []);
    const reviewComponent = [];
    for (let review of reviewSet) {
        reviewComponent.push(<div>
            <h1>{review.reviewText}</h1>
        </div>)

    }

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
            <input value={reviewText} onChange={e => setReviewText(e.target.value)} />
            <br/>
            <button onClick={addNewReview}>
                Submit Review
            </button>
            <br/>
            {reviewComponent}
        </div>
        </Typography>
        </CardContent>
    </Card>)

}
