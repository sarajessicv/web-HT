import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LikeButton from '../HOC/LikeButton';


function Post({postTitle, postItem, postCode, datetime, token}) {
  return (
    <div>
      <h3>{postTitle}</h3>
      <small>{datetime}</small>
      <p>{postItem}</p>
      <SyntaxHighlighter style={docco}>
        {postCode}
      </SyntaxHighlighter>
    </div>
  )
}

export default LikeButton(Post)
