

function FrontPage() {
  let token;
  let user;

  token = localStorage.getItem("auth_token", token);
  console.log(token)
  if (token === null) {
    user = null;
  } else {
    user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  console.log(user)
  return (
    <div>
      <h1>Frontpage</h1>
      <h3>{token ? `Welcome ${user.username}!` : "vittu"}</h3>
    </div>
  )
}

export default FrontPage
