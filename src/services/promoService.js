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
    delData: async (id) => {
        return await app.delete(`/delpromos/${id}`);
    }
};