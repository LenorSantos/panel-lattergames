import { useEffect, useState } from 'react';
import axios from "axios";
import * as crypto from "crypto";

export default function Login() {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pubKey, setPubKey] = useState("");

  const time = 30000;

  const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: time,
  });

  function cripto(pubKey, user, pass) {
    const hash = crypto.createHash('sha512').update(user + pass).digest('hex');
    console.log(hash);
    const cripto = crypto.publicEncrypt({
      key: pubKey,
      oaepHash: 'sha512',
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    }, Buffer.from(hash, 'utf8')).toString("base64");
  
    return cripto;
  }

  async function initial() {
    await app.get('/login').then(result => {
      setPubKey(result.data);
    });
  }

  useEffect(() => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("cypher");
    initial();
  }, []);

  async function login() {
    const cypher = cripto(pubKey, user, pass);

    
    await app.post('/login', {
      login: cypher
    }).then((result) => {
      if (result.status === 200) {
        window.sessionStorage.setItem("token", result.data.token);
        window.sessionStorage.setItem("cypher", cypher);
        window.location.href = "/panel";
      }
    }).catch(err => {
      alert("Login erro");
    });
  }

  return (
    <div className='login'>
      <div className='box-login'>
        <h1>Login</h1>
        <div>
          <input type='text' placeholder='User' onChange={(event) => { setUser(event.target.value) }} />
        </div>
        <div>
          <input type='text' placeholder='Pass' onChange={(event) => { setPass(event.target.value) }} />
        </div>
        <button onClick={() => { login() }} >Login</button>
      </div>
    </div>
  );
}