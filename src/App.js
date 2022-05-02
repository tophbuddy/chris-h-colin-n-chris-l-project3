import React, {useEffect, useState, createContext} from 'react';

import Axios from 'axios';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/HomePage/Home";
import MovieEntry from "./components/MovieEntry";
import AddMovie from "./components/AddMovie"
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";


export const Context = createContext();

function App() {


    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState('');

    return (
        <div>
            <Context.Provider value={
                {
                    username,
                    setUsername,
                    password,
                    setPassword
                }
            }>
                <NavBar />
                <Routes>
                    <Route path={"/home"} element={<Home />}/>
                    <Route path={"/movie/:movieId"} element={<MovieEntry />}/>
                    <Route path={"/addMovie"} element={<AddMovie />}/>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/createUser"} element={<CreateUser />} />
                </Routes>

            </Context.Provider>
        </div>);
}

export default App;
