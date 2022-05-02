import React from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import LoginStatus from "../LoginStatus";

// import { makeStyles } from "@mui/material/styles";
// import { makeStyles } from '@mui/styles';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();
// const useStyles = makeStyles((theme) => ({
//     margin: {
//         "& > *": {
//             margin: theme.spacing(1)
//         }
//     },
//     spacer: {marginBottom: theme.spacing(10)}
// }));


export default function NavBar() {
    // const classes = useStyles();
    return (
        <AppBar position='static'>
            <Toolbar >
                <div >
                    <Button variant="contained" to={"/home"} component={Link}>
                        Home
                    </Button>
                    <Button variant="contained" to={"/addMovie"} component={Link}>
                        Add Movie
                    </Button>
                    <LoginStatus/>
                </div>
            </Toolbar>
        </AppBar>
    )
}