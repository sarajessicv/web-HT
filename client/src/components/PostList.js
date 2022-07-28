import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PostList() {

    const [text, setText] = useState("");
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        fetch("/api/getPosts")
            .then(response => response.json())
            .then(postList => {
                console.log("ENtäs täälä");
                if (postList.length > 0) {
                    console.log("Pääsenkö");
                    setText("Available posts");
                    setTemp(postList);
                } else {
                    setText("No post available, be the first one to make one!");
                }
            })
    }, []);

    if(temp.length === 1) {
        return (
            <div>
                <h3>{text}</h3>
                <ul>
                    <li key={temp[0]._id}><Link to={`/post/${temp[0]._id}`}>{temp[0].title}</Link></li>
                </ul>
            </div>
        )
    } else if (temp.length > 1){
        return (
            <div>
                <h3>{text}</h3>
                <ul>
                    {temp.map((post) => (
                        <li key={post._id}><Link to={`/post/${post._id}`}>{post.title}</Link></li>
                    ))} 
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h3>{text}</h3>
            </div>
        )
    }

    
}

export default PostList
