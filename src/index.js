import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeEntry from './HomeEntry';
import Login from './Login';
import CreateUser from './CreateUser';
import Header from './Header';

ReactDOM.render(
  <div>
  <BrowserRouter>
  <Header />
    <Routes>


      <Route path={"/"} element={<App />}/>
      <Route path={"/home/:homeId"} element={<HomeEntry />}/>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/createUser"} element={<CreateUser />} />
      {/* <Route path={"/home"} element={<Home />}/>
      <Route path={"/about"} element={<About />}/>
      <Route  path={"/counter"} element={<App />}/>
       */}
  </Routes>
  </BrowserRouter>
      
  </div>
,
  document.getElementById('root')
);
