import React, {useState} from 'react';
import {useRef} from 'react';
import { Link} from "react-router-dom";


function Login() {

    const [user, setUser] = useState({});

    const [errorText, setErrorText] = useState("");

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);
  
    const onSubmit = (e) => {
      e.preventDefault();

      fetch("/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/JSON"
        },
        mode: 'cors',
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        console.log("ENtäs täälä");
        if(data.token) {
          console.log("Pääsenkö");
          storeToken(data.token);
          window.location.href = "/";
      } else {
              console.log("####" + (data.errors));
              setErrorText(data.message);
      }
      })
  
    };

    const onChange = () => {
      setUser({
        username: usernameInput.current.value,
        password: passwordInput.current.value
      })
    }

    function storeToken(token){
      localStorage.setItem("auth_token", token);
  }

  return (
    <div>
      <h2>Login screen</h2>
      <form onSubmit={onSubmit} onChange={onChange}>
      <input id="username" type="text" ref={usernameInput} placeholder='Username'></input>
      <input id="password" type="password" ref={passwordInput} placeholder='Password'></input>
      <input id="submit" type="submit" value="Login"></input>
      </form>
      <p id='errorText'>{errorText}</p>
      <Link to='/register'>Not user yet? Register here!</Link>
      <br></br>
      <Link to='/login/forgotpassword'>Forgot your password?</Link>
    </div>
  )
}

export default Login