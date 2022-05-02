import Axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Context} from "../App";
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";
import {AppBar, Toolbar} from "@mui/material";

export default function LoginStatus(props) {

    const { username, setUsername } = useContext(Context);

    //const [username, setUsername] = useState(null);


    const navigate = useNavigate();
    console.log(username);

    useEffect(function () {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .then(response => console.log("hit it"))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function logout() {
        Axios.post('/api/user/logout')
            .then(response => {
                navigate('/')
            })
            .then(setUsername(null))
            .catch(error => console.log("Error logging out"));
    }


    if (username) {
        return (<h1>
            {username} is logged in
            <button onClick={logout}>Logout</button>
        </h1>)
    }



    return (
        <div>
            {!username ?
                <div>
                    <Button variant="contained" to={"/login"} component={Link}>
                        LOGIN
                    </Button>
                    <Button variant="contained" to={"/createUser"} component={Link}>
                        CREATE USER
                    </Button>
                </div> :
                <div>
                    {username} LOGGED IN
                </div>}
        </div>
    )

}