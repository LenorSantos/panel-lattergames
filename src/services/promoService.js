import { app } from "./config";

export const promoService = {
    getData: async () => {
        return await app.get('/promos');
    },
    sendData: async (data) => {
        console.log(data);
        return await app.post('/sendpromos', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
};