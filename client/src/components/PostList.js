import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from './PaginationComponent';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Component to display post titles so user can click the title and will be redirected to the postpage

function PostList() {

    const { t, i18n } = useTranslation('common');
    let pagechoice = useRef(null);

    const [slicer, setSlicer] = useState(5);
    const [temp, setTemp] = useState([]);

    const [page, setPage] = useState(1);

    // fetching all the posts
    useEffect(() => {
        fetch("/api/getPosts")
            .then(response => response.json())
            .then(postList => {
                setTemp(postList);
            })
    }, []);



    // calculating how many posts user wants so see at once. User can decide the amount from 5, 10 or 25 posts with select tag
    let count = Math.ceil(temp.length / slicer);
    let slicedPosts = temp.slice((slicer * page - slicer), slicer * page);


    // getting the value how many posts user wants to see
    const onChange = () => {
        setSlicer(parseInt(pagechoice.current.value));
    }


    // if only one post cant use map so returning only the one post
    if (temp.length === 1) {
        return (
            <div>
                <h3>{t('PostsAvailable')}</h3>
                <ul className="list">
                    <li className="listItem" key={temp[0]._id}><Link to={`/post/${temp[0]._id}`}>{temp[0].title}</Link></li>
                </ul>
            </div>
        )
    } 
    // if many posts, using map command to display all of them (and using pagination)
    else if (temp.length > 1) {
        return (
            <div>
                <h3>{t('PostsAvailable')}</h3>
                <form onChange={onChange}>
                    <div className="selector">
                        <small>{t("PostsPer")}</small>
                        <select className="select" ref={pagechoice}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                    </div>
                </form>
                <ul className="list">
                    {slicedPosts.map((post) => (
                        <li className="listItem" key={post._id}><Link className="postLink" to={`/post/${post._id}`}>{post.title}</Link></li>
                    ))}
                </ul>
                <div className="pagination">
                    <Pagination count={count} setPage={setPage} page={page} />
                </div>
            </div>
        )
    } // if no posts in the database
    else {
        return (
            <div>
                <h3>{t("PostsNoPost")}</h3>
            </div>
        )
    }


}

export default PostList
