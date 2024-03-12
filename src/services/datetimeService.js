import { app } from "./config";

export const DatetimeService = async (time, date) => {
    await app.post('/datetime' ,{
        time: time,
        date: date,
    });
}