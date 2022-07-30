import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import ThumbDown from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUp from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';

// LikeButtons for posts and comments

const LikeButton = (OriginalComponent) => {
    const NewComponent = (props) => {

        const token = props.token;

        // checking wheter user has already voted or not
        const [isVoted, setIsVoted] = useState(false)
        const [count, setCount] = useState()
        const param = useParams();

        let disabled;

        // fetching the likecounts from database
        useEffect(() => {
            fetch("/api/getPost/" + param.id)
                .then(response => response.json())
                .then(post => {
                    setCount(post.likeCount);
                });
        }, []);

        console.log(isVoted)
        console.log(token)

        // defining if buttons are enabled or disabled
        if (token!=null && isVoted === false) {
            disabled = false;
        } else {
            disabled = true;
        }

        // saving the new likecount to database if liked
        const incrementCount = () => {
            setIsVoted(true);
            fetch("/api/modifyLikes/" + param.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/JSON"
                },
                mode: 'cors',
                body: JSON.stringify({ likeCount: count + 1 })
            })
                .then(response => response.json())
                .then(post => {
                    setCount(post.likeCount);
                })
        }
        // saving the new likecount to database if disliked
        const decrementCount = () => {
            setIsVoted(true);
            fetch("/api/modifyLikes/" + param.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/JSON"
                },
                mode: 'cors',
                body: JSON.stringify({ likeCount: count - 1 })
            })
                .then(response => response.json())
                .then(post => {
                    setCount(post.likeCount);
                })
        }

        return (
            <div>
                <OriginalComponent count={count} {...props} />
                <IconButton disabled={disabled} onClick={incrementCount}><ThumbUp /></IconButton>
                <IconButton disabled={disabled} onClick={decrementCount}><ThumbDown /></IconButton>
                <p>{count}</p>
            </div>
        )

    }
    return NewComponent
}

export default LikeButton
