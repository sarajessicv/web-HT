import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from '../components/PaginationComponent';
import { useRef } from 'react';
import { useParams } from "react-router-dom";

function SearchedPage() {

    const param = useParams();

    let pagechoice = useRef(null);

    const [slicer, setSlicer] = useState(5);
    const [text, setText] = useState("");
    const [temp, setTemp] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("/api/search/" + param.keyword)
            .then(response => response.json())
            .then(posts => {
                if (posts.length > 0) {
                    setText("Posts found with keyword '" + param.keyword + "'");
                    setTemp(posts);
                } else {
                    setText("No posts found with keyword '" + param.keyword + "'");
                }
            })
    }, []);

    let count = Math.ceil(temp.length / slicer);
    let slicedPosts = temp.slice((slicer * page - slicer), slicer * page);


    const onChange = () => {
        setSlicer(parseInt(pagechoice.current.value));
    }


    if (temp.length === 1) {
        return (
            <div>
                <h3>{text}</h3>
                <ul>
                    <li key={temp[0]._id}><Link to={`/post/${temp[0]._id}`}>{temp[0].title}</Link></li>
                </ul>
            </div>
        )
    } else if (temp.length > 1) {
        return (
            <div>
                <h3>{text}</h3>
                <form onChange={onChange}>
                    <small>Posts per page</small>
                    <select ref={pagechoice}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                    </select>
                </form>
                <ul>
                    {slicedPosts.map((post) => (
                        <li key={post._id}><Link to={`/post/${post._id}`}>{post.title}</Link></li>
                    ))}
                </ul>
                <Pagination count={count} setPage={setPage} page={page} />
            </div>
        )
    } else {
        return (
            <div>
                <h3>{text}</h3>
                <Link to={"/"}>Back to the posts</Link>
            </div>
        )
    }
}

export default SearchedPage
