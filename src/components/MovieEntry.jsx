import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Context } from "../App.jsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function MovieEntry(props) {

    const navigate = useNavigate();
    const {username, setUsername, loggedIn, setLoggedIn} = useContext(Context);
    const [movie, setMovie] = useState();
    const [reviewText, setReviewText] = useState('');
    const [curMovieTitle, setCurMovieTitle] = useState('');
    const [reviewSet, setReviewSet] = useState([]);
    const reviewComponent = [];
    const params = useParams();

    useEffect(() => {
        Axios.get('http://localhost:8000/api/movies/movieID/' + params.movieId)
            .then(function(response) {
            setMovie(response.data);
            setCurMovieTitle(response.data.movieTitle);
            console.log(response.data.movieTitle)
            })
    }, []);

    useEffect(() => {
        console.log("movie state changed");
        getReviews();
    }, [curMovieTitle])

    function getReviews() {
        Axios.get('http://localhost:8000/api/reviews/getByMovie/' + curMovieTitle)
            .then(function (response) {
                setReviewSet(response.data);
                console.log("get");
                console.log(response.data);
            })
    }

    function addNewReview() {
        if (loggedIn) {
            Axios.post('/api/reviews', {reviewText, username, curMovieTitle})
                .then(response => {
                    console.log("Added review");
                    console.log(response.data);
                    navigate('/movie/movieID/' + movie.movieId);
                })
                .catch(error => console.log(error));
        } else {
            console.log("User must be logged in to submit review");
        }
    }

    if (!movie) {
        return (<div>
            Movie loading...
        </div>)
    }

    for (let review of reviewSet) {
        reviewComponent.push(
        <div>
            <p>Reviewer: {review.owner}</p>
            <p>{review.reviewText}</p>
        </div>
        )
    }

    return (
        <Card>
        <CardContent>
            <Typography >
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
        </Card>
    )
}
