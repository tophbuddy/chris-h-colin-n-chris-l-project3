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



    const [homes, setHomes] = useState([]);
    const [newHomeInput, setNewHomeInput] = useState('');

    function getHomes() {
        Axios.get('/api/home')
            .then(function (response) {
                setHomes(response.data);
            })
    }

    function createNewHome() {
        if (!newHomeInput) return;

        Axios.post('/api/home', {
            address: newHomeInput,
        })
            .then(function (response) {
                setNewHomeInput('');
                getHomes();
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    useEffect(getHomes, []);

    const homeComponent = [];
    for (let home of homes) {
        homeComponent.push(<div>
            <a href={'/home/' + home._id}><h1>{home.address}</h1></a>

            <h5>Room Count: {home.roomCount}</h5>
        </div>)

    }

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


                {homeComponent}



            </Context.Provider>
        </div>);
}

export default App;
