import { useState } from "react";
import {DatetimeService} from "../services/datetimeService";

export default function Datetime() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

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
                    <button onClick={() => {DatetimeService(time, date);}}>Enviar Dados</button>
                </div>
            </div>
            <div className="line"></div>
        </>
    );
}