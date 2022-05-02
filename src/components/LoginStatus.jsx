import Axios from 'axios';
import React, {useEffect, useContext} from 'react';
import {Context} from "../App";
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";

export default function LoginStatus(props) {

    const {username, setUsername, setPassword, loggedIn, setLoggedIn} = useContext(Context);
    const navigate = useNavigate();

    useEffect(function () {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function logout() {
        Axios.post('/api/user/logout')
            .then(response => {
                navigate('/')
            })
            .then(setUsername(''))
            .then(setPassword(''))
            .then(setLoggedIn(false))
            .catch(error => console.log("Error logging out"));
    }

    return (
        <div>
            {loggedIn ?
                <div>
                    {username.toUpperCase()}
                    <Button variant="contained" onClick={logout}>
                        LOG OUT
                    </Button>
                </div>
                :
                <div>
                    <Button variant="contained" to={"/login"} component={Link}>
                        LOGIN
                    </Button>
                    <Button variant="contained" to={"/createUser"} component={Link}>
                        CREATE USER
                    </Button>
                </div>}
        </div>
    )

}