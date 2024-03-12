import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { promoService } from "../services/promoService";

export default function Promo() {
    // data
    const [pulldata, setpulldata] = useState([]);

    const getdata = () => {
        promoService.getData().then(result => {
            setpulldata(result.data);
        }).catch(err => {
            alert("erro ao requisitar as promoções");
        });
    }

    // senddata
    const refproducts = useRef();
    const [link, setlink] = useState("");
    const [porcentagem, setporcentagem] = useState("");
    const [titulo, settitulo] = useState("");
    const [preco, setpreco] = useState("");
    const [img, setImg] = useState([]);

    async function senddata() {
        await promoService.sendData({
            img: img,
            link: link,
            porcentagem: porcentagem,
            titulo: titulo,
            preco: preco,
        }).then(result => {
            // console.log(result);
            if (result.status !== 200) alert("Erro ao salvar promoção");
        }).finally(() => {getdata();})
    };

    const deletedata = (val) => {
        axios.post("http://localhost:3001/deleteproducts", val).then((result) => {
            if (result.status === 200) {
                console.log("deletado");
                getdata();
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => { getdata(); });
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className="dados">
                <h1>Promo</h1>
                <label>Link:</label>
                <input type="text" onChange={(event) => {
                    setlink(event.target.value);
                }}
                />
                <label>Porcentagem:</label>
                <input type="text" onChange={(event) => {
                    setporcentagem(event.target.value);
                }}
                />
                <label>Titulo:</label>
                <input type="text" onChange={(event) => {
                    settitulo(event.target.value);
                }}
                />
                <label>Preço:</label>
                <input type="text" onChange={(event) => {
                    setpreco(event.target.value);
                }}
                />
                <label>Imagem</label>
                <input type="file" onChange={(event) => {
                    // setnameimage(event.target.files[0].name);
                    // setimage(event.target.files[0]);
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
                            <div className="container-scroll">
                                <button onClick={() => { deletedata(val) }}>apagar</button>
                                {val.id}
                                <figure className="image">
                                    <a href={val.link}>
                                        <p>{val.porcentagem}</p>
                                        {/* <img src={`img/${val.img}`} alt="imgpng"/> */}
                                        <img src={val.imgdata} alt="imgpng" />
                                        <figcaption>{val.titulo}</figcaption>
                                        <br />
                                        <figcaption>{val.preco}</figcaption>
                                    </a>
                                </figure>
                            </div>
                        );
                    })}
                </div>
                <p>productsção</p>
                <button onClick={() => {getdata()}}>Atualizar Promo</button>
            </div>
        </>
    );
}