import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import ThumbDown from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUp from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';

const LikeButton = (OriginalComponent) => {
    const NewComponent = (props) => {

        const token = props.token;

        const [count, setCount] = useState(0)
        const [isVoted, setIsVoted] = useState(false)
        const param = useParams();

        let disabled;

        if(token && isVoted===false) {
            disabled = false;
        } else {
            disabled = true;
        }

        useEffect(() => {
            fetch("/api/getPost/" + param.id)
                .then(response => response.json())
                .then(post => {
                    setCount(post.likeCount);
                });
        }, []);

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
