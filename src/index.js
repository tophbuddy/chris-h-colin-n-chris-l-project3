import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import MovieEntry from './components/MovieEntry';
import Home from './components/HomePage/Home.jsx';
import Header from './Header';
import NavBar from './components/NavBar/NavBar';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
  <BrowserRouter>
    <NavBar />
    <Header />
      <Routes>
        <Route path={"/"} element={<App />}/>
        <Route path={"/home"} element={<Home />}/>
        <Route path={"/movie/:movieId"} element={<MovieEntry />}/>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/createUser"} element={<CreateUser />} />
      </Routes>
  </BrowserRouter>
      
  </div>
,
  document.getElementById('root')
);

reportWebVitals();