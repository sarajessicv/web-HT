import React, {useState} from 'react';
import {useRef} from 'react';
import { Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';

// Login page content. Used also if user wants to post but is not logged in

function Login() {

  const {t, i18n} = useTranslation('common');

    const [user, setUser] = useState({});

    const [errorText, setErrorText] = useState("");

    let usernameInput = useRef(null);
    let passwordInput = useRef(null);
  
    // when user presses submit button to log in
    const onSubmit = (e) => {
      e.preventDefault();

      // fetching data if user is authorized to log in
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
        if(data.token) {
          storeToken(data.token);
          window.location.href = "/";
      } else {
              console.log("####" + (data.errors));
              setErrorText(data.message);
      }
      })
  
    };

    // Collecting user input from formdata
    const onChange = () => {
      setUser({
        username: usernameInput.current.value,
        password: passwordInput.current.value
      })
    }

    // Storing authorization token so we can know is user is logged in or not
    function storeToken(token){
      localStorage.setItem("auth_token", token);
  }

  return (
    <div>
      <h2>{t("LoginScreen")}</h2>
      <form onSubmit={onSubmit} onChange={onChange}>
      <input className='inputField' id="username" type="text" ref={usernameInput} placeholder={t("Username")}></input>
      <input className='inputField' id="password" type="password" ref={passwordInput} placeholder={t("Password")}></input>
      <input id="submit" type="submit" value={t("Login")} className='button'></input>
      </form>
      <p className='errorText' id='errorText'>{errorText}</p>
      <Link className='textLink' to='/register'>{t("LoginRegister")}</Link>
      <br></br>
      <Link className='textLink'to='/login/forgotpassword'>{t("LoginForgot")}</Link>
    </div>
  )
}

export default Login