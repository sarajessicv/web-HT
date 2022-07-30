import LikeButton from '../HOC/LikeButton';

function Comment({datetime, username, newComment, token}) {
    return (
        <div>
            <small>{datetime}</small>
            <h5>{username}</h5>
            <p>{newComment}</p>
        </div>
    )
}

// Basic component to display comment, wrapped with HOC so users can like or dislike and see the like count
export default LikeButton(Comment)
