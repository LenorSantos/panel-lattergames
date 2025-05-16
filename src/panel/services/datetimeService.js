import { app } from "./config";

export const DatetimeService = {
    sendDatetime: async (data) => {
        return await app.post('/datetime', data, {
            headers: {
                Authorization: `${window.sessionStorage.getItem("token")}`,
            },
        }).catch(err => {
            alert("Acesso expirado ou não autorizado.");
            if (err.response.status == 401) window.location.href = "/";
        });
    },
}