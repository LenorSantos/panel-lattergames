import { useEffect, useState } from 'react';
import '../styles/login.css';
import { LoginService } from '../services/loginService';
// import CryptoJS from 'crypto-js';
// import forge from 'node-forge';
import { Buffer } from 'buffer';
// import { publicEncrypt, constants } from 'crypto';
// const crypto = CryptoJS;
import {publicEncrypt, constants} from 'crypto-browserify';

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pubKey, setPubKey] = useState("");
  // console.log(user, pass);

  async function initial() {
    await LoginService.initial().then(result => {
      setPubKey(result.data);
      console.log(result);
    });
  }

  useEffect(() => {
    initial();
  }, []);

  async function login() {
    // crypto.createHash('sha512').update(JSON.stringify(user, pass)).digest('hex')
    console.log(user, pass);
    // const teste = forge.pki.publicKeyFromPem(pubKey).encrypt(Buffer.from(user, "utf8") , 'RSA-OAEP', {
    //   md: forge.md.sha512.create(),
    //   mgf1: {
    //     md: forge.md.sha512.create()
    //   }
    // });
    // console.log(teste);
    // console.log(crypto.AES.encrypt(user, pubKey, {
    //   mode: CryptoJS.mode.CBC,
    // }).toString());
    // const cripto = "usuario";
    const teste = publicEncrypt({
      key: pubKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha512',
    }, Buffer.from(user, "utf8"));
    console.log(teste);


    await LoginService.login("lenor").then((result) => {
      if (result.status === 200) {
        // window.location.href = "panel";
        console.log(result.data);
      }
    });
  }

  return (
    <div className='login'>
      <div className='box-login'>
        <h1>Login</h1>
        <div>
          {/* <label>User</label> */}
          <input type='text' placeholder='User' onChange={(event) => { setUser(event.target.value) }} />
        </div>
        <div>
          {/* <label>Pass</label> */}
          <input type='text' placeholder='Pass' onChange={(event) => { setPass(event.target.value) }} />
        </div>
        <button onClick={() => { login() }} >Login</button>
      </div>
    </div>
  );
}