import { app, token } from "./config";

export const promoService = {
    getData: async () => {
        return await app.get('/promos');
    },
    sendData: async (data) => {
        return await app.post('/promos', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': `${token}`
            },
        });
    },
    delData: async (id) => {
        return await app.delete('/promos', {params: {id: id}});
    }
};