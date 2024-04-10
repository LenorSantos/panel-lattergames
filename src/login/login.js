import { useEffect, useState } from 'react';
import '../styles/login.css';
import { LoginService } from '../services/loginService';

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // console.log(user, pass);

  async function initial() {
    await LoginService.initial().then(result => {
      console.log(result);
    });
  }

  useEffect(() => {
    initial();
  }, []);

  async function login() {
    await LoginService.login(user, pass).then((result) => {
      if (result.status === 200) {
        window.location.href = "panel";
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