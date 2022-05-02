import React, {useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import {Context} from "../App";

export default function Login(props) {

    const { username, setUsername, password, setPassword, setLoggedIn } = useContext(Context);

    const [usernameGiven, setUsernameGiven] = useState("");
    const [passwordGiven, setPasswordGiven] = useState("");
    console.log(usernameGiven);

    const navigate = useNavigate();


    function login() {
        Axios.post('/api/user/authenticate', {usernameGiven, passwordGiven})
            .then(response => {
                if (response) {
                    setLoggedIn(true);
                    setUsername(usernameGiven);
                    setPassword(passwordGiven)
                }
                }
            )
            .then(response => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h5>
                Username
            </h5>
            <input value={usernameGiven} onChange={e => setUsernameGiven(e.target.value)} />
            <h5>
                Password
            </h5>
            <input type='password' value={passwordGiven} onChange={e => setPasswordGiven(e.target.value)} />
            <button onClick={login}>
                Login
            </button>
        </div>

    )


} 