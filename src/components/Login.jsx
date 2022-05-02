import React, {useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import {Context} from "../App";

export default function Login(props) {

    const { username, setUsername, password, setPassword } = useContext(Context);


    const navigate = useNavigate();


    function login() {
        Axios.post('/api/user/authenticate', {username, password})
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
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <h5>
                Password
            </h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>
                Login
            </button>
        </div>

    )


} 