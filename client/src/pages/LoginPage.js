import Login from "../components/Login"

// page to show login component

function LoginPage({setJwt, jwt, setCurrentUser, currentUser}) {
  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default LoginPage
