import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function News() {
    const refnews = useRef();

    const [idnews, setidnews] = useState(0);
    const [texto, settexto] = useState("");

    // send image
    const [nameimgnews, setnameimgnews] = useState("");
    const [imgnew, setimgnew] = useState(null);
    const imgnews = new FormData();

    // data
    const [pullnews, setpullnews] = useState([]);

    const senddadosdestaque = () => {
        imgnews.append("imgnew", imgnew);
        axios.post("http://localhost:3001/imgnews", imgnews).then((result) => {
            if (result.data === "TypeError: imgnew.mv is not a function") {
                refnews.current.value = "";
            } else if (result.status === 200) {
                axios.post("http://localhost:3001/news", {
                    id: parseInt(idnews),
                    texto: texto,
                    imgname: nameimgnews
                }).then((result) => {
                    if (result.data !== "") {
                        refnews.current.value = "";
                    } else if (result.status === 200) {
                        refnews.current.value = "";
                        getnews();
                    }
                });
            }

        });
    }

    const getnews = () => {
        axios.get("http://localhost:3001/pullnews").then((result) => {
            setpullnews(result.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const delnews = (val) => {
        axios.post("http://localhost:3001/delnews", val).then((result) => {
            if (result.status === 200) {
                getnews();
            }
        });
    }

    useEffect(() => {
        getnews();
    }, []);

    return (
        <>
            <div className="dados-destaque">
                <h1>News</h1>
                <label>ID:</label>
                <input type="number" onChange={(event) => {
                    setidnews(event.target.value);
                }}
                />
                <label>Texto:</label>
                <textarea rows="30" onChange={(event) => {
                    settexto(event.target.value);
                }}></textarea>
                <label>Imagem</label>
                <input type="file" onChange={(event) => {
                    setnameimgnews(event.target.files[0].name);
                    setimgnew(event.target.files[0]);
                }} ref={refnews} />
                <div className="btndados-destaque">
                    <button onClick={senddadosdestaque}>Enviar Dados</button>
                </div>
            </div>
            <div className="pullnews">
                <div className="container-news">
                    {Array.from(pullnews).map((val) => {
                        return (
                            <div className="news">
                                <button onClick={() => { delnews(val) }}>apagar</button>
                                <p>{val.id}</p>
                                <img src={val.imgdata} alt="imgpng" />
                            </div>
                        );
                    })}
                </div>
                <p>news</p>
                <button onClick={getnews}>Puxar dados</button>
            </div>
        </>
    );
}