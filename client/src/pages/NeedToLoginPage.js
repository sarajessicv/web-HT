import Login from '../components/Login'
import {useTranslation} from 'react-i18next';

// user is redirected to this page if he tries to post and is not logged in. Uses login component

function NeedToLoginPage() {
  const {t, i18n} = useTranslation('common');
  return (
    <div>
        <h2>{t("NeedToLogin")}</h2>
        <Login/>
    </div>
  )
}

export default NeedToLoginPage
