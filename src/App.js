import "./App.css";
import {useState, useRef} from "react";
import axios from "axios";

function App() {
  const refdestaques = useRef();
  const refpromo = useRef();

  // toppoage
  const [hora, sethora] = useState("");
  const [data, setdata] = useState("");

  const sendtoppage = () => {
    axios.post("http://localhost:3001/toppage", {
      hora: hora,
      data: data,
    });
  }
  // toppage

  // promo
  const [id, setid] = useState(0);
  const [link, setlink] = useState("");
  const [porcentagem, setporcentagem] = useState("");
  const [titulo, settitulo] = useState("");
  const [preco, setpreco] = useState("");

  // send image
  const [nameimage, setnameimage] = useState("");
  const [image, setimage] = useState(null);
  const imgpromo = new FormData();

  // data
  const [pulldados, setpulldados] = useState([]);

  const senddados = () => {
    imgpromo.append("image", image);
    axios.post("http://localhost:3001/image", imgpromo).then((result) => {
      if (result.data === "TypeError: imgnew.mv is not a function") {
        console.log(result);
        refdestaques.current.value = "";
      } else if (result.status === 200) {
        axios.post("http://localhost:3001/promo", {
          id: parseInt(id),
          link: link,
          porcentagem: porcentagem,
          titulo: titulo,
          preco: preco,
          imgname: nameimage
        }).then((result) => {
          if (result.data !== "") {
            refpromo.current.value = "";
            console.log(result);
          } else if (result.status === 200) {
            refpromo.current.value = "";
            getdados();
          }
        });
      }
    });
  }

  const getdados = () => {
    axios.get("http://localhost:3001/pullpromo").then((result) => {
      setpulldados(result.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const deletedados = (val) => {
    axios.post("http://localhost:3001/deletepromo", val).then((result) => {
      if (result.status === 200) {
        getdados();
      }
    });
  }
  // promo

  // destaques
  const [idnew, setidnew] = useState(0);
  const [texto, settexto] = useState("");

  // send image
  const [nameimgnew, setnameimgnew] = useState("");
  const [imgnew, setimgnew] = useState(null);
  const imgdestaques = new FormData();

  // data
  const [pulldestaques, setpulldestaques] = useState([]);
  console.log(pulldestaques);

  const senddadosdestaque = () => {
    imgdestaques.append("imgnew", imgnew);
    axios.post("http://localhost:3001/imgdestaques", imgdestaques).then((result) => {
      if (result.data === "TypeError: imgnew.mv is not a function") {
        console.log(result);
        refdestaques.current.value = "";
      } else if (result.status === 200) {
        axios.post("http://localhost:3001/destaques", {
          id: parseInt(idnew),
          texto: texto,
          imgname: nameimgnew
        }).then((result) => {
          if (result.data !== "") {
            refdestaques.current.value = "";
            console.log(result);
          } else if (result.status === 200) {
            refdestaques.current.value = "";
            getdestaques();
          }
        });
      }

    });
  }

  const getdestaques = () => {
    axios.get("http://localhost:3001/pulldestaques").then((result) => {
      setpulldestaques(result.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const deldestaques = (val) => {
    axios.post("http://localhost:3001/deldestaques", val).then((result) => {
      if (result.status === 200) {
        getdestaques();
      }
    });
  }
  // destaques

  // auto request
  if (pulldestaques.length === 0) {
    getdestaques();
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
      {/* inicio promo */}
      <div className="dados">
        <h1>Promoção</h1>
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
        }} ref={refpromo}/>
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
      <p>Promoção</p>
      <button onClick={getdados}>Puxar dados</button>
      </div>
      {/* fim promo */}
      <div className="line"></div>
      {/* inicio destques */}
      <div className="dados-destaque">
        <h1>Destaques</h1>
        <label>ID:</label>
        <input type="number" onChange={(event) => {
          setidnew(event.target.value);
        }}
        />
        <label>Texto:</label>
        <textarea rows="30" onChange={(event) => {
          settexto(event.target.value);
        }}></textarea>
        <label>Imagem</label>
        <input type="file" onChange={(event) => {
          setnameimgnew(event.target.files[0].name);
          setimgnew(event.target.files[0]);
        }} ref={refdestaques}/>
        <div className="btndados-destaque">
          <button onClick={senddadosdestaque}>Enviar Dados</button>
        </div>
      </div>
      <div className="pulldestaques">
        <div className="container-destaques">
          {Array.from(pulldestaques).map((val) => {
            return (
              <div className="destaques">
                <button onClick={() => {deldestaques(val)}}>apagar</button>
                <p>{val.id}</p>
                <img src={val.imgdata} alt="imgpng"/>
              </div>
            );
          })}
        </div>
        <p>Destaques</p>
        <button onClick={getdestaques}>Puxar dados</button>
      </div>
      {/* fim destaques */}
    </div>
  );
}

export default App;
