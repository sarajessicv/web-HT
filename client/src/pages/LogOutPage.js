
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LogOutPage() {
  localStorage.removeItem("auth_token");

  const navigate = useNavigate()
  navigate('/logout')

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
      navigate('/')
    }, 3000)
  })


  return (
    <div>
      <p>You have successfully logged out!</p>
      <p>You will be redirected to the front page after 3 seconds</p>
    </div>
  )
}

export default LogOutPage
