import {useTranslation} from 'react-i18next';


function ForgotPassWord() {

  const {t, i18n} = useTranslation('common');

  return (
    <div>
      <h2>{t("Forgot")}</h2>
    </div>
  )
}

// Content for "ForgotPasswordPage". Could be developed to send email to user so he could change his password
export default ForgotPassWord
