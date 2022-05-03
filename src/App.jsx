import React, {useState, createContext} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./components/HomePage/Home";
import MovieEntry from "./components/MovieEntry";
import AddMovie from "./components/AddMovie"
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";


export const Context = createContext();

function App() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <Context.Provider value={
                {
                    username,
                    setUsername,
                    password,
                    setPassword,
                    loggedIn,
                    setLoggedIn
                }
            }>
                <NavBar />
                <Routes>
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route path={"/home"} element={<Home />}/>
                    <Route path={"/movie/movieID/:movieId"} element={<MovieEntry />}/>
                    <Route path={"/addMovie"} element={<AddMovie />}/>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/createUser"} element={<CreateUser />} />
                </Routes>

            </Context.Provider>
        </div>);
}

export default App;
