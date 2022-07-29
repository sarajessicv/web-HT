import LikeButton from '../HOC/LikeButton';

function Comment({datetime, username, newComment, token}) {
    return (
        <div>
            <small>{datetime}</small>
            <h6>{username}</h6>
            <p>{newComment}</p>
        </div>
    )
}

export default LikeButton(Comment)
