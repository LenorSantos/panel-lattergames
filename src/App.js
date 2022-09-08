import "./App.css";
import {useState, useRef} from "react";
import axios from "axios";

function App() {
  const refnews = useRef();
  const refproducts = useRef();

  // toppoage
  const [hora, sethora] = useState("");
  const [data, setdata] = useState("");

  const sendtoppage = () => {
    axios.post("http://localhost:3001/datetime", {
      hora: hora,
      data: data,
    });
  }
  // toppage

  // products
  const [id, setid] = useState(0);
  const [link, setlink] = useState("");
  const [porcentagem, setporcentagem] = useState("");
  const [titulo, settitulo] = useState("");
  const [preco, setpreco] = useState("");

  // send image
  const [nameimage, setnameimage] = useState("");
  const [image, setimage] = useState(null);
  const imgproducts = new FormData();

  // data
  const [pulldados, setpulldados] = useState([]);

  const senddados = () => {
    imgproducts.append("image", image);
    axios.post("http://localhost:3001/image", imgproducts).then((result) => {
      if (result.data === "TypeError: imgnew.mv is not a function") {
        console.log(result);
        refproducts.current.value = "";
      } else if (result.status === 200) {
        axios.post("http://localhost:3001/products", {
          id: parseInt(id),
          link: link,
          porcentagem: porcentagem,
          titulo: titulo,
          preco: preco,
          imgname: nameimage
        }).then((result) => {
          if (result.data !== "") {
            refproducts.current.value = "";
            console.log(result);
          } else if (result.status === 200) {
            refproducts.current.value = "";
            getdados();
          }
        });
      }
    });
  }

  const getdados = () => {
    axios.get("http://localhost:3001/reqproducts").then((result) => {
      setpulldados(result.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const deletedados = (val) => {
    axios.post("http://localhost:3001/deleteproducts", val).then((result) => {
      if (result.status === 200) {
        getdados();
      }
    });
  }
  // products

  // news
  const [idnews, setidnews] = useState(0);
  const [texto, settexto] = useState("");

  // send image
  const [nameimgnews, setnameimgnews] = useState("");
  const [imgnew, setimgnew] = useState(null);
  const imgnews = new FormData();

  // data
  const [pullnews, setpullnews] = useState([]);
  console.log(pullnews);

  const senddadosdestaque = () => {
    imgnews.append("imgnew", imgnew);
    axios.post("http://localhost:3001/imgnews", imgnews).then((result) => {
      if (result.data === "TypeError: imgnew.mv is not a function") {
        console.log(result);
        refnews.current.value = "";
      } else if (result.status === 200) {
        axios.post("http://localhost:3001/news", {
          id: parseInt(idnews),
          texto: texto,
          imgname: nameimgnews
        }).then((result) => {
          if (result.data !== "") {
            refnews.current.value = "";
            console.log(result);
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
  // news

  // auto request
  if (pullnews.length === 0) {
    getnews();
  }
  if (pulldados.length === 0) {
    getdados();
  }
  // auto request

  return (
    <div className="App">
      {/* update time */}
      <div className="toppage">
        <h1>Atualizar data e hora</h1>
        <label>Hora:</label>
        <input type="time" onChange={(event) => {
          sethora(event.target.value);
        }}
        />
        <label>Data:</label>
        <input type="date" onChange={(event) => {
          setdata(event.target.value);
        }}
        />
        <div className="btntop">
          <button onClick={sendtoppage}>Enviar Dados</button>
        </div>
      </div>
      {/* update time */}
      <div className="line"></div>
      {/* inicio products */}
      <div className="dados">
        <h1>productsção</h1>
        <label>ID:</label>
        <input type="number" onChange={(event) => {
          setid(event.target.value);
          // console.log(event);
        }}
        />
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
          setnameimage(event.target.files[0].name);
          setimage(event.target.files[0]);
        }} ref={refproducts}/>
        <div className="btndados">
          <button onClick={senddados}>Enviar Dados</button>
        </div>
      </div>
      <div className="pulldados">
        <div className="container">
          {Array.from(pulldados).map((val) => {
            return (
              <div className="container-scroll">
                <button onClick={() => {deletedados(val)}}>apagar</button>
                {val.id}
                <figure className="image">
                  <a href={val.link}>
                    <p>{val.porcentagem}</p>
                    {/* <img src={`img/${val.img}`} alt="imgpng"/> */}
                    <img src={val.imgdata} alt="imgpng"/>
                    <figcaption>{val.titulo}</figcaption>
                    <br/>
                    <figcaption>{val.preco}</figcaption>
                  </a>
                </figure>
              </div>
            );
          })}
        </div>
      <p>productsção</p>
      <button onClick={getdados}>Puxar dados</button>
      </div>
      {/* fim products */}
      <div className="line"></div>
      {/* inicio destques */}
      <div className="dados-destaque">
        <h1>news</h1>
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
        }} ref={refnews}/>
        <div className="btndados-destaque">
          <button onClick={senddadosdestaque}>Enviar Dados</button>
        </div>
      </div>
      <div className="pullnews">
        <div className="container-news">
          {Array.from(pullnews).map((val) => {
            return (
              <div className="news">
                <button onClick={() => {delnews(val)}}>apagar</button>
                <p>{val.id}</p>
                <img src={val.imgdata} alt="imgpng"/>
              </div>
            );
          })}
        </div>
        <p>news</p>
        <button onClick={getnews}>Puxar dados</button>
      </div>
      {/* fim news */}
    </div>
  );
}

export default App;
