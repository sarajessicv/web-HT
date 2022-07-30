
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useTranslation} from 'react-i18next';

// page which is shown when user pressed log out option

function LogOutPage() {
  const {t, i18n} = useTranslation('common');
  // token is removed so no user is logged in anymore
  localStorage.removeItem("auth_token");

  const navigate = useNavigate()

  // navigating to homepage after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
      navigate('/')
    }, 3000)
  },[])


  return (
    <div>
      <p>{t("LoggedOut")}</p>
      <p>{t("LogoutRedirect")}</p>
    </div>
  )
}

export default LogOutPage
