import { useState, useEffect, useRef } from "react";
import { newsService } from "../services/newsService";

export default function News() {
    // data
    const [news, setNews] = useState([]);

    async function getnews() {
        await newsService.getNews().then(result => {
            setNews(result.data);
        }).catch(err => {
            // console.log(err);
            // alert("erro ao requisitar os destaques do mes");
        });
    }

    // send news
    const refnews = useRef();
    const [text, settexto] = useState("");
    const [img, setImg] = useState([]);

    async function sendNews() {
        await newsService.sendNews({
            img: img,
            text: text,
        }).then(result => {
            if ((result.status !== 200) && (result.status !== 201)) alert("Erro ao salvar destaque");
        }).finally(() => {getnews()});
    }

    // delete
    async function delnews(id) {
        await newsService.delNews(id).then((result) => {
            if (result.status === 200) {
                console.log("deletado");
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {getnews()});
    }

    useEffect(() => {
        getnews();
    }, []);

    return (
        <>
            <div className="dados-destaque">
                <h1>News</h1>
                <label>Text:</label>
                <textarea rows="30" onChange={(event) => {
                    settexto(event.target.value);
                }}></textarea>
                <label>Img</label>
                <input type="file" onChange={(event) => {
                    setImg(event.target.files[0]);
                }} ref={refnews} />
                <div className="btndados-destaque">
                    <button onClick={sendNews}>Enviar Dados</button>
                </div>
            </div>
            <div className="news">
                <div className="container-news">
                    {Array.from(news).map((val) => {
                        return (
                            <div key={val.id} className="news">
                                <button onClick={() => { delnews(val.id) }}>apagar</button>
                                <img src={val.imgdata} alt="imgpng" />
                            </div>
                        );
                    })}
                </div>
                <p>news</p>
                <button onClick={() => {getnews()}}>Puxar dados</button>
            </div>
        </>
    );
}