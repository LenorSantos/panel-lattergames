import { app } from "./config";

export const newsService = {
    getNews: async () => {
        return await app.get('/news');
    },
    sendNews: async (data) => {
        return await app.post('/news', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    delNews: async (id) => {
        return await app.delete('/news', {params: {id: id}});
    }
};