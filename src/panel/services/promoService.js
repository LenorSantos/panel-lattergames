import { app, token } from "./config";

export const promoService = {
    getData: async () => {
        return await app.get('/promos');
    },
    sendData: async (data) => {
        return await app.post('/promos', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${window.sessionStorage.getItem("token")}`,
            },
        }).catch(err => {
            alert("Acesso expirado ou não autorizado.");
            if (err.response.status == 401) window.location.href = "/";
        });
    },
    delData: async (id) => {
        return await app.delete('/promos', {
            params: {
                id: id
            },
            headers: {
                Authorization: `${window.sessionStorage.getItem("token")}`,
            }
        }).catch(err => {
            alert("Acesso expirado ou não autorizado.");
            if (err.response.status == 401) window.location.href = "/";
        });
    }
};