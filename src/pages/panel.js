import Head from "next/head";
import { modules } from "../panel/modules/index.js";
import { useState, useEffect } from "react";
// import './styles/_main.css';

function Panel() {
  
  useEffect(() => {
    console.log(window.sessionStorage.getItem("token"));
  });
  
  return (
    <>
      <Head>
        <title>Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/joystick.png" />
      </Head>
      <main>
        <div className="App">
          <h1 className="headerText">Painel de controle</h1>
          {/* Datetime */}
          <modules.Datetime />

          {/* promo */}
          <modules.Promo />

          <div className="line"></div>

          {/* inicio news */}
          <modules.News />
        </div>
      </main>
    </>
  );
}

export default Panel;
