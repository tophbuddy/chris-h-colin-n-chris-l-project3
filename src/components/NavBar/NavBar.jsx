import React from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";
import LoginStatus from "../LoginStatus";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
    },
  });

export default function NavBar() {
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