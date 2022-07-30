import { useState, useEffect } from "react";
import { useParams } from "react-router";
import React from "react";
import { useRef } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import {useTranslation} from 'react-i18next';


// page to show one post and its comments and likes


function PostPage({token}) {
    const {t, i18n} = useTranslation('common');

    let commentInput = useRef(null);
    let user;

    if (token === null) {
        user = null;
    } else {
        user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    }

    const param = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [code, setCode] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [username, setUsername] = useState("");
    const [datetime, setDatetime] = useState("");
    const [successState, setSuccessState] = useState(false);

    // fetching the specific post user wanted to see
    useEffect(() => {
        fetch("/api/getPost/" + param.id)
            .then(response => response.json())
            .then(post => {
                setTitle(post.title);
                setText(post.post);
                setCode(post.code);
                setComments(post.comments);
                setUsername(post.username);
                setDatetime(post.datetime);
            })
    }, []);

    // when user adds a new comment
    const onSubmit = (e) => {
        e.preventDefault();

        // saving the new comment to database
        fetch("/api/addComment/" + param.id, {
            method: "POST",
            mode: 'cors',
            headers: {
                'content-type': 'application/JSON'
            },
            body: JSON.stringify(newComment)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    setSuccessState(true);
                    commentInput.current.value = "";
                } else {
                    console.log("####" + (data.errors));
                }
            })

    };

    // checking wheter the saving of a new comment has been successfull, if yes (and always yes) user is instructed to refresh the page so he can see the new comment
    let commentInfo;
    if(successState === true) {
        commentInfo = "NeedToRefresh";
    } else {
        commentInfo = "";
    }

    // getting the comment content
    const onChange = () => {
        setNewComment({
            newComment: commentInput.current.value,
            username: user.username
        })
    }
    // setting timestamp to comment when submitted
    const setTime = () => {
        const current = new Date();
        const datetime = current.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });

        setNewComment({ ...newComment, datetime: datetime });
      }


    return (
        <div>
            <p><small>{t("PostedBy")}</small> <h4>{username}</h4></p>
            <Post postTitle={title} postItem={text} postCode={code} datetime={datetime} token={token} />
            <div>
                {token ?
                    <div><form onSubmit={onSubmit} onChange={onChange}>
                        <textarea className='inputField' ref={commentInput} placeholder={t("WriteComment")} />
                        <input type={'submit'} value={t("AddComment")} onClick={setTime} className='button'></input>
                    </form>
                        <p>{t(commentInfo)}</p></div> :
                    <p>{t("NeedLoginCom")}</p>}
            </div>
            <div className="comments">
                <ul className="list">
                    {comments.map((comment, i) => (
                        <li className="listItem" key={i}>
                           <Comment datetime={comment.datetime} username={comment.username} newComment={comment.newComment} token={token}></Comment> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PostPage
