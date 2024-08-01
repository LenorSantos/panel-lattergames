import { useState, useRef, useEffect } from "react";
import { promoService } from "../services/promoService";

export default function Promo() {
    // data
    const [pulldata, setpulldata] = useState([]);

    async function getdata() {
        await promoService.getData().then(result => {
            setpulldata(result.data);
        }).catch(err => {
            // console.log(err);
            // alert("erro ao requisitar as promoções");
        });
    }

    // send promo
    const refproducts = useRef();
    const [link, setlink] = useState("");
    const [percent, setPercent] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState([]);

    async function senddata() {
        await promoService.sendData({
            img: img,
            link: link,
            percent: percent,
            title: title,
            price: price,
        }).then(result => {
            if ((result.status !== 200) && (result.status !== 201)) alert("Erro ao salvar promoção");
        }).finally(() => {getdata()});
    };

    // delete promo
    async function deldata(id) {
        await promoService.delData(id).then((result) => {
            if (result.status === 200) {
                console.log("deletado");
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {getdata()});
    }

    // initial req
    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className="dados">
                <h1>Cadastrar promoção</h1>
                <label>Link:</label>
                <input type="text" onChange={(event) => {
                    setlink(event.target.value);
                }}
                />
                <label>percent:</label>
                <input type="text" onChange={(event) => {
                    setPercent(event.target.value);
                }}
                />
                <label>title:</label>
                <input type="text" onChange={(event) => {
                    setTitle(event.target.value);
                }}
                />
                <label>Price:</label>
                <input type="text" onChange={(event) => {
                    setPrice(event.target.value);
                }}
                />
                <label>Imagem</label>
                <input type="file" onChange={(event) => {
                    setImg(event.target.files[0]);
                }} ref={refproducts} />
                <div className="btndados">
                    <button onClick={senddata}>Enviar Dados</button>
                </div>
            </div>
            <div className="pulldados">
                <div className="container">
                    {Array.from(pulldata).map((val) => {
                        return (
                            <div key={val.id} className="container-scroll">
                                <button onClick={() => { deldata(val.id) }}>apagar</button>
                                <figure className="image">
                                    <a href={val.link}>
                                        <p>{val.percent}</p>
                                        <img src={val.imgdata} alt="imgpng" />
                                        <figcaption>{val.title}</figcaption>
                                        <br />
                                        <figcaption>{val.price}</figcaption>
                                    </a>
                                </figure>
                            </div>
                        );
                    })}
                </div>
                <p>Promos</p>
                <button onClick={() => {getdata()}}>Atualizar Promos</button>
            </div>
        </>
    );
}