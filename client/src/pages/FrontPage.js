import { useNavigate } from "react-router";
import PostList from "../components/PostList";
import {useTranslation} from 'react-i18next';

// frontpage (homepage)

function FrontPage({token}) {

  const {t, i18n} = useTranslation('common');

  let user;

  console.log(token)
  if (token === null) {
    user = null;
  } else {
    user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  console.log(user)

  const navigate = useNavigate();

  // if user is logged in he can add a post
  function addPost() {
    navigate("/addPost");
  }
// if user is not logged in he will redirected to log in page
  const needLogin = () => {
    navigate("/needToLogin");
  }

  return (
    <div>
      <h1>{t("FrontPage")}</h1>
      <h3>{token ? t("FrontPageWelcome") +  `${user.username}` + "!" : ""}</h3>
      <button className='button' onClick={token ? addPost : needLogin}>{t("AddPost")} </button>
      <PostList/>
    </div>
  )
}

export default FrontPage
