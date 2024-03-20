import { app } from "./config";

export const DatetimeService = async (time, date) => {
    await app.post('/setdatetime' ,{
        time: time,
        date: date,
    });
}