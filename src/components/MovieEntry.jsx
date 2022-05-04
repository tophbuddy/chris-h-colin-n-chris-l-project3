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
import { format } from 'date-fns';

export default function MovieEntry(props) {

    const navigate = useNavigate();
    const {username, setUsername, loggedIn, setLoggedIn} = useContext(Context);
    const [movie, setMovie] = useState();
    const [reviewText, setReviewText] = useState("");
    const [curMovieTitle, setCurMovieTitle] = useState('');
    const [curMovieID, setCurMovieID] = useState('');
    const [reviewSet, setReviewSet] = useState([]);
    const [showReviewEdit, setShowReviewEdit] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [showMovieEdit, setShowMovieEdit] = useState(false);
    const [newMovieInfo, setNewMovieInfo] = useState( {newMovie: {
        movieTitle: "",
        director: "",
        genre: "",
        description: "",
    }});
    const reviewComponent = [];
    const params = useParams();

    useEffect(() => {
        Axios.get('http://localhost:8000/api/movies/movieID/' + params.movieId)
            .then(function(response) {
            setMovie(response.data);
            setCurMovieID(response.data._id);
            setCurMovieTitle(response.data.movieTitle);
            })
    }, []);

    useEffect(() => {
        getReviews();
    }, []);

    const clear = () => {
        setReviewText("");
    };

    function getReviews() {
        Axios.get('http://localhost:8000/api/reviews/getReviewsByMovieID/' + curMovieID)
            .then(function (response) {
                setReviewSet(response.data);
                console.log("get");
            })
    }

    function addNewReview() {
        if (loggedIn) {
            Axios.post('http://localhost:8000/api/reviews', {reviewText, username, curMovieID})
                .then(response => {
                    console.log("Added review");
                    getReviews();
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
                    getReviews();
                })
                .catch(error => console.log(error));
        } else {
            console.log("You are not the owner of this review")
        }
    }

    function editMovie(e) {
        if (loggedIn) {
            Axios.put('http://localhost:8000/api/movies/' +  e.target.id , {newMovieInfo})
                .then(response => {
                    console.log("updated movie");
                    navigate('/home/');
                })
                .catch(error => console.log(error));
        } else {
            console.log("Must be logged in to edit")
        }
    }

    function editReview(e) {
        if (username === e.target.value) {
            console.log("target update id: " + e.target.id);
            console.log("target update text: " + submitText);
            Axios.put('http://localhost:8000/api/reviews/' +  e.target.id , {submitText, username, curMovieID})
                .then(response => {
                    console.log("updated review");
                    setSubmitText('');
                })
                .catch(error => console.log(error));
        } else {
            console.log("You are not the owner of this review")
        }
    }

    function enableReviewEdit(e) {
        if (loggedIn && username !== e.target.value) {
            alert("Must be owner to edit");
        } else if (!loggedIn) {
            alert("Must be logged in to edit");
        } else {
            setShowReviewEdit(!showReviewEdit);
        }
    }

    function enableMovieEdit(e) {
        if (!loggedIn) {
            alert("Must be logged in to edit");
        } else {
            setShowMovieEdit(!showMovieEdit);
        }
    }

    function handleMovieEditChange(e) {
        console.log("name: " + e.target.name)
        console.log("value: " + e.target.value)
        setNewMovieInfo({
            [e.target.name]: e.target.value
        })
    }

    if (!movie) {
        return (<div>
            Movie loading...
        </div>)
    }
    
    if (reviewSet.length == 0 || reviewSet === undefined) {
        return (<div>
            Review loading...
        </div>)
    } else {
    for (let review of reviewSet) {
        console.log("fdsf")
        reviewComponent.push(
        <Card variant='outlined' id={review._id}>
        <CardContent>
        <Typography >
        <div>
            <h4>{review.owner}</h4>
            <p>Published {review.creationDate}</p>
            <br></br>
            <p>{review.reviewText}</p>
            <br></br>
            <p>
            <Button 
                size='large' 
                onClick={enableReviewEdit} 
                value={review.owner} 
                id={review._id} 
                label='edit'
                >
                Edit
            </Button>
            {showReviewEdit &&
            <TextField
                size='small'
                onChange={(e) => {
                    setSubmitText(e.target.value)
                }}
            />
            }
            </p>
            <p>
            {showReviewEdit &&
            <Button 
                size='large' 
                onClick={editReview} 
                value={review.owner} 
                id={review._id}
                >
                    Submit Edit
            </Button>
            }
            <Button 
                size='large' 
                onClick={deleteReview} 
                value={review.owner} 
                id={review._id} 
                label='delete'
                >
                Delete
            </Button>
            </p>
        </div>
        </Typography>
        </CardContent>
        </Card>
        )
    }
}






    return (
        <div>
            <Card>
                <CardContent>
                    <Typography >
                        <div>
                        <h1>
                            {movie.movieTitle} 
                        </h1>
                        <h3>
                            Movie Image will be displayed here
                        </h3>
                        <h3>
                            Director: {movie.director}
                        </h3>
                        <h4>
                            Date Created: {format(new Date(), 'do MMMM Y')}
                            <div>{movie.releaseDate}</div>
                        </h4>
                        <h4>
                            Description: {movie.description}
                        </h4>
                        
                        <TextField 
                            fullWidth={true} 
                            margin={'dense'} 
                            label={"Review Content"} 
                            value={reviewText} 
                            onChange={e => setReviewText(e.target.value)} 
                            />
                        <br/>
                        <Button onClick={() => {addNewReview(); clear();}}>
                            Submit Review
                        </Button>
                        </div>
                    </Typography>
                </CardContent>
            </Card>
            <Typography ><h3>Reviews</h3></Typography>
            {reviewComponent}
            <Button onClick={enableMovieEdit}>
                Edit Movie
            </Button>
            {showMovieEdit && 
                <Card>
                    <TextField
                        name="titleEditField"
                        label={"New Movie Title"}
                        size='small'
                        onChange={
                            handleMovieEditChange
                        }
                    />
                    <TextField
                        name="descriptionEditField"
                        label={"New Movie Description"}
                        size='small'
                        onChange={
                            handleMovieEditChange
                        }
                    />
                    <TextField
                        name="directorEditField"
                        label={"New Movie Director"}
                        size='small'
                        onChange={
                            handleMovieEditChange
                        }
                    />
                    <TextField
                        name="genreEditField"
                        label={"New Movie Genre"}
                        size='small'
                        onChange={
                            handleMovieEditChange
                        }
                    />
                    <Button onClick={editMovie}>
                        Submit Movie Edit
                    </Button>
                </Card>
                }
        </div>     
    )
}
