import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './login/login';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   {/* <App /> */}
  //   <Login />
  //   <Router>
  //     <App />
  //   </Router>
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={Login} />
      <Route path='panel' Component={App} />
    </Routes>
  </BrowserRouter>
);