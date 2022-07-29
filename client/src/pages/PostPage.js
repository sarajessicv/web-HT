import { useState, useEffect } from "react";
import { useParams } from "react-router";
import React from "react";
import { useRef } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";


function PostPage({token}) {

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
    const [commentInfo, setCommentInfo] = useState("");

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

    const onSubmit = (e) => {
        e.preventDefault();

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
                console.log("ENtäs täälä");
                if (data.success === true) {
                    setCommentInfo("Refresh the page to see your comment");
                    //console.log("Jee kommentti meni");
                    commentInput.current.value = "";
                } else {
                    console.log("####" + (data.errors));
                    //toast.info(data.message, {transition: Slide})
                }
            })

    };

    const onChange = () => {
        setNewComment({
            newComment: commentInput.current.value,
            username: user.username
        })
    }

    const setTime = () => {
        const current = new Date();
        const datetime = current.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });

        setNewComment({ ...newComment, datetime: datetime });
      }


    return (
        <div>
            <p><small>Posted by: <br></br> {username}</small></p>
            <Post postTitle={title} postItem={text} postCode={code} datetime={datetime} token={token} />
            <div>
                {token ?
                    <div><form onSubmit={onSubmit} onChange={onChange}>
                        <textarea ref={commentInput} placeholder="Write your comment here" />
                        <input type={'submit'} value={'Leave a comment'} onClick={setTime}></input>
                    </form>
                        <p>{commentInfo}</p></div> :
                    <p>You need to login to leave a comment</p>}
            </div>
            <div className="comments">
                <ul>
                    {comments.map((comment, i) => (
                        <li key={i}>
                           <Comment datetime={comment.datetime} username={comment.username} newComment={comment.newComment} token={token}></Comment> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PostPage
