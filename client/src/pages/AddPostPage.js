import { useRef, useState } from 'react';

function AddPostPage() {

  let token
  token = localStorage.getItem("auth_token");
  let user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  const [post, setPost] = useState({});
  const [errorText, setErrorText] = useState("");

  let titleInput = useRef(null);
  let postInput = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("/api/addNewPost", {
      method: "POST",
      headers: {
        "content-type": "application/JSON"
      },
      mode: 'cors',
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          console.log("Pääsenkö");
          window.location.href = "/";
        } else {
          console.log("####" + (data.errors));
          setErrorText(data.message);
        }
      })

  };


  const onChange = () => {
    setPost({
      title: titleInput.current.value,
      post: postInput.current.value,
      comments: [],
      username: user.username
    })
  }



  return (
    <div>
      <p>{errorText}</p>
      <p>Add a new post</p>
      <form onSubmit={onSubmit} onChange={onChange}>
        <input type={'text'} ref={titleInput} placeholder="title of the post"></input>
        <textarea ref={postInput} placeholder="the post"></textarea>
        <input type={'submit'} value={'Send a post'}></input>
      </form>
    </div>
  )
}

export default AddPostPage
