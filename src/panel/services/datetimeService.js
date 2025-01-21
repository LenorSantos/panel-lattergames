import { app } from "./config";

export const DatetimeService = async (time, date) => {
    await app.post('/datetime', {
        time: time,
        date: date,
    }, {
        headers: {
            Authorization: `${window.sessionStorage.getItem("token")}`,
        },
    }).then(result => {
        // console.log(result.statusText);
        // if (result.status == 401) {
        //     // console.log("ok");
        //     // window.location.href = "/";
        // }
    }).catch(err => {
        // console.log(err.response.status);
        alert("Acesso expirado ou não autorizado.");
        if (err.response.status == 401) window.location.href = "/";
    });
}