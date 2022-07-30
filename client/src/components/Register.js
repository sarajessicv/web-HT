import { useRef } from 'react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';

// Register page content
function Register() {
  const {t, i18n} = useTranslation('common');

  const [errorText, setErrorText] = useState("");
  const [user, setUser] = useState({});

  let usernameInput = useRef(null);
  let emailInput = useRef(null);
  let passwordInput = useRef(null);
  let password2Input = useRef(null);

  // when user presses the button to register
  const onSubmit = (e) => {
    e.preventDefault();

    // fetching that there is no user with given username, registering user to database if not
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
          storeToken(data.token);
          window.location.href = "/";
        } else {
          setErrorText(data.errors[0].msg);
        }
      })
  }

  // storing authorization token so we can see if user is logged in or not
  function storeToken(token) {
    localStorage.setItem("auth_token", token);
  }

  // getting user's inputs
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
      <h2>{t("RegisterPage")}</h2>
      <form onSubmit={onSubmit} onChange={onChange}>
        <input className='inputField' id="username" type="text" ref={usernameInput} placeholder={t('Username')}></input>
        <input className='inputField' id="email" type="text" ref={emailInput} placeholder={t('Email')}></input>
        <input className='inputField' id="password" type="password" ref={passwordInput} placeholder={t('Password')}></input>
        <input className='inputField' id="password2" type="password" ref={password2Input} placeholder={t('PasswordAgain')}></input>
        <input id="submit" type="submit" value={t('RegisterBtn')} className='button'></input>
      </form>
      <p className='errorText'>{errorText}</p>
      <Link className='textLink' to='/login'>{t('RegisterToLogin')}</Link>
    </div>
  )
}

export default Register
