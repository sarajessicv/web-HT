import React, {useState} from 'react';
import {useRef} from 'react';
import { Link } from "react-router-dom";


function Login() {

    const [book, setBook] = useState({});

    let usernameInput = useRef(null);
    let emailInput = useRef(null);
    let password1Input = useRef(null);
  
    const onSubmit = (e) => {
      e.preventDefault();
      
      console.log("testi2");
      fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        mode: 'cors',
        body: JSON.stringify(book)
      })
      .then(response => console.log(response))
      .then(data => setBook({}))
  
    };
  

  return (
    <div>
      <h2>Login screen</h2>
      <form onSubmit={onSubmit}>
      <input id="username" type="text" ref={usernameInput} placeholder='Username'></input>
      <input id="email" type="text" ref={emailInput} placeholder='Email-address'></input>
      <input id="password1" type="password" ref={password1Input} placeholder='Password'></input>
      <input id="submit" type="submit" value="Login"></input>
      </form>
      <Link to='/register'>Not user yet? Register here!</Link>
      <br></br>
      <Link to='/login/forgotpassword'>Forgot your password?</Link>
    </div>
  )
}

export default Login