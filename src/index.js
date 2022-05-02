import React, {useEffect, useState, createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import MovieEntry from './components/MovieEntry';
import Home from './components/HomePage/Home.jsx';
import LoginStatus from './components/LoginStatus';
import NavBar from './components/NavBar/NavBar';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(

  <BrowserRouter>
      <App />
  </BrowserRouter>


,
  document.getElementById('root')
);

reportWebVitals();