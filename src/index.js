import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

{/* <BrowserRouter>
<Routes>
    <Route path={"/"} element={<Home />}/>
    <Route path={"/home"} element={<Home />}/>
    <Route path={"/about"} element={<About />}/>
    <Route  path={"/counter"} element={<App />}/>
    <Route exact path={"/hello/:name?"} element={<HelloYou />}/>
</Routes>
</BrowserRouter> */}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
