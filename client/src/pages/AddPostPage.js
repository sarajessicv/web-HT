import { useRef, useState } from 'react';
import {useTranslation} from 'react-i18next';

// user can add a new post to the site


function AddPostPage({token}) {
  const {t, i18n} = useTranslation('common');

  let user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  const [post, setPost] = useState({});
  const [errorText, setErrorText] = useState("");

  let titleInput = useRef(null);
  let postInput = useRef(null);
  let codeInput = useRef(null);

  // when pressed post new post
  const onSubmit = (e) => {
    e.preventDefault();

    // saving new post to database and redirecting user to homepage
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
          window.location.href = "/";
        } else {
          setErrorText(data.message);
        }
      })

  };


  const onChange = () => {
    // getting user input
    setPost({
      title: titleInput.current.value,
      post: postInput.current.value,
      code: codeInput.current.value,
      comments: [],
      username: user.username,
      likeCount: 0
    })
  }

  // setting timestamp to post when submitting
  const setTime = () => {
    const current = new Date();
    const datetime = current.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});

    setPost({...post, datetime: datetime});
  }


  return (
    <div>
      <p className='errorText'>{errorText}</p>
      <p>{t("AddPost")}</p>
      <form onSubmit={onSubmit} onChange={onChange}>
        <input className='inputField' type={'text'} ref={titleInput} placeholder={t("AddTitle")}></input>
        <textarea className='inputField' ref={postInput} placeholder={t("AddQuestion")}></textarea>
        <textarea className='inputField' ref={codeInput} placeholder={t("AddCode")}></textarea>
        <input type={'submit'} value={t("AddSend")} onClick={setTime} className='button'></input>
      </form>
    </div>
  )
}

export default AddPostPage
