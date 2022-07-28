import { useState, useEffect } from "react";
import { useParams } from "react-router";
import React from "react";
import { useRef } from "react";
import Post from "../components/Post";


function PostPage() {

    let commentInput = useRef(null);

    let token;
    let user;

    token = localStorage.getItem("auth_token");
    if (token === null) {
        user = null;
    } else {
        user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    }

    const param = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("/api/getPost/" + param.id)
            .then(response => response.json())
            .then(post => {
                console.log("ENtäs täälä");
                setTitle(post.title);
                setText(post.post);
                setComments(post.comments);
                setUsername(post.username);
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
                    console.log("Jee kommentti meni");
                    commentInput.current.value = "";
                    //toast.info("Comment posted, refresh the page to see it!", {transition: Slide})
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


    return (
        <div>
            <p><small>Posted by: <br></br> {username}</small></p>
            <Post postTitle={title} postItem={text}/>
            <div>
                {token ? <form onSubmit={onSubmit} onChange={onChange}>
                    <textarea ref={commentInput} placeholder="Write your comment here" />
                    <input type={'submit'} value={'Leave a comment'}></input>
                </form> :
                    <p>You need to login to leave a comment</p>}
            </div>
            <div className="comments">
                <ul>
                    {comments.map((comment, i) => (
                        <li key={i}>
                            <h6>{comment.username}</h6>
                            <p>{comment.newComment}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PostPage
