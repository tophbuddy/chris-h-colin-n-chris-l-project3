import React from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/material/styles";


const useStyles = makeStyles((theme) => ({
    margin: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    spacer: {marginBottom: theme.spacing(10)}
}));

export default function NavBar() {
    const classes = useStyles();
    return (
        <AppBar position='static'>
            <Toolbar >
                <div className={classes.margin}>
                    <Button variant="contained" to={"/home"} component={Link}>
                        Home
                    </Button>
                    <Button variant="contained" to={"/login"} component={Link}>
                        Login
                    </Button>
                    <Button variant="contained" to={"/createUser"} component={Link}>
                        Create User
                    </Button>
                    <Button variant="contained" to={"/createMovie"} component={Link}>
                        Add Movie
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}