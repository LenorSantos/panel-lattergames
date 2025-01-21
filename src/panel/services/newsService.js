import { app } from "./config";

export const newsService = {
    getNews: async () => {
        return await app.get('/news');
    },
    sendNews: async (data) => {
        return await app.post('/news', data, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `${window.sessionStorage.getItem("token")}`,
            },
        }).catch(err => {
            alert("Acesso expirado ou não autorizado.");
            if (err.response.status == 401) window.location.href = "/";
        });
    },
    delNews: async (id) => {
        return await app.delete('/news', {
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