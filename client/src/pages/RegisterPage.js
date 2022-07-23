import Register from '../components/Register'

function RegisterPage({setJwt, jwt, setCurrentUser, currentUser}) {
  return (
    <div>
      <Register setJwt={setJwt} jwt={jwt} setCurrentUser={setCurrentUser} ></Register>
    </div>
  )
}

export default RegisterPage
