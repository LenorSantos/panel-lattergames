import axios from "axios";

const time = 30000;

export const app = axios.create({
    // baseURL: "http://192.168.1.91:3001",
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: time,
});

// export const token = window.sessionStorage.getItem("token");