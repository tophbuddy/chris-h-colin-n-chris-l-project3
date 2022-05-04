import Axios from 'axios';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Context } from "../App.jsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { useAlert } from 'react-alert';


export default function MovieEntry(props) {

    const navigate = useNavigate();
    const {username, setUsername, loggedIn, setLoggedIn} = useContext(Context);
    const [movie, setMovie] = useState();
    const [reviewText, setReviewText] = useState('');
    const [curMovieTitle, setCurMovieTitle] = useState('');
    const [reviewSet, setReviewSet] = useState([]);
    const [showEdit, setShowEdit] = useState(true);
    const [submitText, setSubmitText] = useState("");
    const reviewComponent = [];
    const editFormIds = [];
    const params = useParams();
    // const alert = useAlert();

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
            Axios.post('http://localhost:8000/api/reviews', {reviewText, username, curMovieTitle})
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

    function deleteReview(e) {
        if (username === e.target.value) {
            Axios.delete('http://localhost:8000/api/reviews/' + e.target.id)
                .then(response => {
                    console.log("deleted review");
                    console.log(response.data);
                    navigate('/home');
                })
                .catch(error => console.log(error));
        } else {
            console.log("You are not the owner of this review")
        }
    }

    function editReview(e) {
        if (username === e.target.value) {
            console.log("target update id: " + e.target.id);
            console.log("target update text: " + submitText);
            Axios.put('http://localhost:8000/api/reviews/' +  e.target.id , {submitText, username, curMovieTitle})
                .then(response => {
                    console.log("updated review");
                    console.log(response.data);
                    setSubmitText('');
                    // navigate('/home');
                })
                .catch(error => console.log(error));
        } else {
            console.log("You are not the owner of this review")
        }
    }

    function enableEditField() {
        setShowEdit(!showEdit);
    }

    const onFocus = () => {
        setSubmitText()
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
            <p>Publish Date: {review.creationDate}</p>
            <p>{review.reviewText}</p>
            <Button 
                size='large' 
                onClick={deleteReview} 
                value={review.owner} 
                id={review._id} 
                label='delete'
                >
                Delete
            </Button>
            <Button 
                size='large' 
                onClick={enableEditField} 
                value={review.owner} 
                id={review._id} 
                label='edit'
                >
                Edit
            </Button>
            <TextField
                onFocus={onFocus}
                disabled={showEdit}
                value={submitText}
                onChange={(e) => {
                    setSubmitText(e.target.value)
                    console.log("field: " + submitText);
                }}
            />
            <Button disabled={showEdit} size='large' onClick={editReview} value={review.owner} id={review._id}>
                    Submit Edit
                </Button>
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
