// import "./App.css";
// import {useState, useRef, useEffect} from "react";
// import axios from "axios";
import Datetime from "./pages/datetime";
import News from "./pages/news";
import Promo from "./pages/promo";
import './styles/_main.css';

function App() {
  

  return (
    <div className="App">
      <h1 className="headerText">Painel de controle</h1>
      {/* Datetime */}
      <Datetime />

      {/* promo */}
      <Promo />

      <div className="line"></div>

      {/* inicio news */}
      <News />
    </div>
  );
}

export default App;
