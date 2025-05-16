import axios from "axios";

const time = 30000;

export const app = axios.create({
    // baseURL: "http://localhost:3001",
    // baseURL: "https://server-latter-games.vercel.app",
    baseURL: process.env.API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: time,
});