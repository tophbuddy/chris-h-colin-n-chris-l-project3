import React, {useState, useContext} from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router';
import {Context} from "../App";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
        <div>
            <Typography variant='h4'>Create User</Typography> 
            <TextField margin={'dense'} label={"Username"} value={usernameGiven} onChange={e => setUsernameGiven(e.target.value)}/>
            <TextField margin={'dense'} label={"Password"} type='password' value={passwordGiven} onChange={e => setPasswordGiven(e.target.value)}/>
            <Button onClick={createNewUser}>
                Create User
            </Button>
        </div>
    </Box>

    )


} 