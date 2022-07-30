import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from '../components/PaginationComponent';
import { useRef } from 'react';
import { useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next';

// when user uses the search feature he will be redirected to this webpage

function SearchedPage() {
    const {t, i18n} = useTranslation('common');

    const param = useParams();

    let pagechoice = useRef(null);

    const [slicer, setSlicer] = useState(5);
    const [text, setText] = useState("");
    const [temp, setTemp] = useState([]);

    const [page, setPage] = useState(1);

    // fetching form the database if there is posts with the specific keyword
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

    // user can again choose how many posts he wants to see at same time
    let count = Math.ceil(temp.length / slicer);
    let slicedPosts = temp.slice((slicer * page - slicer), slicer * page);


    // getting user's choice for how many posts he wants to see
    const onChange = () => {
        setSlicer(parseInt(pagechoice.current.value));
    }

    // if only one post is found, returning this because map function cant be used when only one item
    if (temp.length === 1) {
        return (
            <div>
                <h3>{t("PostsFound")} {param.keyword} {"'"}</h3>
                <ul>
                    <li key={temp[0]._id}><Link to={`/post/${temp[0]._id}`}>{temp[0].title}</Link></li>
                </ul>
            </div>
        )
    }  // if multiple posts found from the database
    else if (temp.length > 1) {
        return (
            <div>
                <h3>{t("PostsFound")} {param.keyword} {"'"}</h3>
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
                        <li className="listItem" key={post._id}><Link to={`/post/${post._id}`}>{post.title}</Link></li>
                    ))}
                </ul>
                <div className="pagination">
                <Pagination count={count} setPage={setPage} page={page} />
                </div>
            </div>
        )
    } // if no posts found
    else {
        return (
            <div>
                <h3>{t("NoPostsFound")} {param.keyword} {"'"}</h3>
                <Link to={"/"}>{t("BackToPost")}</Link>
            </div>
        )
    }
}

export default SearchedPage
