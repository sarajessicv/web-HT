import { useRef } from 'react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {

  const [errorText, setErrorText] = useState("");
  const [user, setUser] = useState({});

  let usernameInput = useRef(null);
  let emailInput = useRef(null);
  let passwordInput = useRef(null);
  let password2Input = useRef(null);

  const onSubmit = (e) => {
    console.log("register");
    e.preventDefault();

    fetch("/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/JSON"
      },
      mode: 'cors',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          console.log("Pääsenkö");
          storeToken(data.token);
          window.location.href = "/";
        } else {
          console.log("####" + (data.errors));
          setErrorText(data.errors[0].msg);
        }
      })
  }

  function storeToken(token) {
    localStorage.setItem("auth_token", token);
  }

  const onChange = () => {
    if (passwordInput.current.value === password2Input.current.value) {
      setErrorText("");
      setUser({
        username: usernameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      })
    } else {
      setErrorText("Passwords are not the same!");
    }
    
  }

  return (
    <div>
      <h2>Register page</h2>
      <form onSubmit={onSubmit} onChange={onChange}>
        <input id="username" type="text" ref={usernameInput} placeholder='Username'></input>
        <input id="email" type="text" ref={emailInput} placeholder='Email-address'></input>
        <input id="password" type="password" ref={passwordInput} placeholder='Password'></input>
        <input id="password2" type="password" ref={password2Input} placeholder='Password again'></input>
        <input id="submit" type="submit" value="Register"></input>
      </form>
      <p>{errorText}</p>
      <Link to='/login'>Already have an account?</Link>
    </div>
  )
}

export default Register
