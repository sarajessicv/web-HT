import { useNavigate } from "react-router";
import PostList from "../components/PostList";


function FrontPage() {
  let token;
  let user;

  token = localStorage.getItem("auth_token");
  console.log(token)
  if (token === null) {
    user = null;
  } else {
    user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  console.log(user)

  const navigate = useNavigate();

  function addPost() {
    navigate("/addPost");
  }

  const needLogin = () => {
    console.log("Päästäänkö tänne");
    navigate("/needToLogin");
  }

  return (
    <div>
      <h1>Frontpage</h1>
      <h3>{token ? `Welcome ${user.username}!` : ""}</h3>
      <button onClick={token ? addPost : needLogin}>Add a post</button>
      <PostList/>
    </div>
  )
}

export default FrontPage
