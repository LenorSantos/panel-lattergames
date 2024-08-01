"use client"
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./login";
// import Panel from "./panel/panel";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/joystick.png" />
      </Head>
      <main>
        <Login />
        {/* <Panel /> */}
      </main>
    </>
  );
}
