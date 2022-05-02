import React, {useState, useContext} from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router';
import {Context} from "../App";

export default function CreateUser(props) {

    const {setUsername, setPassword, setLoggedIn} = useContext(Context);
    const [usernameGiven, setUsernameGiven] = useState("");
    const [passwordGiven, setPasswordGiven] = useState("");
    const navigate = useNavigate();

    function createNewUser() {
        Axios.post('/api/user', {usernameGiven, passwordGiven})
            .then(response => {
                setLoggedIn(true);
                setUsername(usernameGiven);
                setPassword(passwordGiven);
                console.log("Created user");
                console.log(response.data);
                navigate('/');

            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Create User</h1>
            <h5>
                Username
            </h5>
            <input value={usernameGiven} onChange={e => setUsernameGiven(e.target.value)}/>
            <h5>
                Password
            </h5>
            <input type='password' value={passwordGiven} onChange={e => setPasswordGiven(e.target.value)}/>
            <button onClick={createNewUser}>
                Create User
            </button>
        </div>

    )


} 