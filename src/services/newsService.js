import { app } from "./config";

export const newsService = {
    getNews: async () => {
        return await app.get('/news');
    },
    sendNews: async (data) => {
        return await app.post('/setnews', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    delNews: async (id) => {
        return await app.delete(`/delnews/${id}`);
    }
};