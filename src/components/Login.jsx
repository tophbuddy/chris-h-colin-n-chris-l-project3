import React, {useState, useContext} from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router';
import {Context} from "../App";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login(props) {

    const {setUsername, setPassword, setLoggedIn} = useContext(Context);
    const [usernameGiven, setUsernameGiven] = useState("");
    const [passwordGiven, setPasswordGiven] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);
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
            .catch(error => {
                console.log(error);
                setInvalidLogin(true);
            });
    }

    function InvalidMessage() {
        if (invalidLogin) {
            return <div>Invalid Username or Password</div>
        }
    }

    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
            <Typography variant='h4'>Login</Typography> 
            <InvalidMessage/>
            <TextField margin={'dense'} label={"Username"} value={usernameGiven} onChange={e => setUsernameGiven(e.target.value)}/>
            <TextField margin={'dense'} label={"Password"} type='password' value={passwordGiven} onChange={e => setPasswordGiven(e.target.value)}/>
            <Button size='large' onClick={login}>
                Login
            </Button>
        </div>
    </Box>

    )


} 