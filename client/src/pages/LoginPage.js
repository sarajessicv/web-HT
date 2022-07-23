import Login from "../components/Login"

function LoginPage({setJwt, jwt, setCurrentUser, currentUser}) {
  return (
    <div>
      <Login setJwt={setJwt} jwt={jwt} setCurrentUser={setCurrentUser} currentUser={currentUser}></Login>
    </div>
  )
}

export default LoginPage
