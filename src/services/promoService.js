import { app } from "./config";

export const promoService = {
    getData: async () => {
        return await app.get('/promos');
    },
    sendData: async (data) => {
        return await app.post('/sendpromos', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    delData: async (title) => {
        return await app.delete(`/delproducts/${title}`);
    }
};