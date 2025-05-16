import { useState } from "react";
import { DatetimeService } from "../services/datetimeService";

export default function Datetime() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    async function DateTime() {
        await DatetimeService.sendDatetime({
            time: time,
            date: date,
        }).then(result => {
            if ((result.status !== 200) && (result.status !== 201)) {
                alert("Erro ao salvar Hora e data");
            } else {
                alert("Sucesso ao salvar Hora e data");
            }
        }).catch(err => {

        });
    }

    return (
        <>
            <div className="toppage">
                <h1>Atualizar data e hora</h1>
                <label>Hora:</label>
                <input type="time" onChange={(event) => {
                    setTime(event.target.value);
                }}
                />
                <label>Data:</label>
                <input type="date" onChange={(event) => {
                    setDate(event.target.value);
                }}
                />
                <div className="btntop">
                    <button onClick={DateTime}>Atualizar</button>
                </div>
            </div>
            <div className="line"></div>
        </>
    );
}