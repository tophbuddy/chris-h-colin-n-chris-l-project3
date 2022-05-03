import React from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import LoginStatus from "../LoginStatus";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
// import { makeStyles } from "@mui/material/styles";
// import { makeStyles } from '@mui/styles';


// const theme = createTheme();
// const useStyles = makeStyles((theme) => ({
//     margin: {
//         "& > *": {
//             margin: theme.spacing(1)
//         }
//     },
//     spacer: {marginBottom: theme.spacing(10)}
// }));
const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
    },
  });

export default function NavBar() {
    // const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
        <AppBar  position='static' >
            <Toolbar elevation={0} sx={{
            display: "flex",
            justifyContent: "space-between"     
            }} >
                <div>
                    <Button disableElevation={true} variant="contained" to={"/home"} component={Link}>
                        Home
                    </Button>
                    
                    <Button disableElevation={true} variant="contained" to={"/addMovie"} component={Link}>
                        Add Movie
                    </Button>
                </div>
                <div>
                    <LoginStatus/>
                </div>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    )
}