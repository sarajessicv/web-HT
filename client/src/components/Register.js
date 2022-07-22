import {useRef} from 'react';


function Register() {


  let usernameInput = useRef(null);
  let emailInput = useRef(null);
  let password1Input = useRef(null);
  let password2Input = useRef(null);

  const onSubmit = (e) => {

  }

  return (
    <div>
      <h2>Register page</h2>
      <form onSubmit={onSubmit}>
      <input id="username" type="text" ref={usernameInput} placeholder='Username'></input>
      <input id="email" type="text" ref={emailInput} placeholder='Email-address'></input>
      <input id="password1" type="password" ref={password1Input} placeholder='Password'></input>
      <input id="password2" type="password" ref={password2Input} placeholder='Password again'></input>
      <input id="submit" type="submit" value="Register"></input>
      </form>
    </div>
  )
}

export default Register
