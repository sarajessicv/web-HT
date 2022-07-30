import { Divider } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LikeButton from '../HOC/LikeButton';


function Post({postTitle, postItem, postCode, datetime, token}) {
  return (
    <div>
      <h3>{postTitle}</h3>
      <Divider/>
      <small>{datetime}</small>
      <p>{postItem}</p>
      <SyntaxHighlighter style={docco}>
        {postCode}
      </SyntaxHighlighter>
      <Divider/>
    </div>
  )
}

// basic post component for one post. Used to map list items. Wrapped with HOC so that user can like or dislike and see the likecount
export default LikeButton(Post)
