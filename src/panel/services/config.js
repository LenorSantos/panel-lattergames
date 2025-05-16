import axios from "axios";

const time = 30000;

export const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: time,
});