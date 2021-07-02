import React from 'react';
import { Link } from 'react-router-dom';
import { FaReddit } from "react-icons/fa";

const AllReddits = (props) => {
    const { list, articleClick } = props;
    return (
        <Link to={`/dragon/${list?.name}`} className="all-links">        
        <article onClick={articleClick} key={list?.id} className="article-map">
        <div className="article-background"></div>
        <div className="list-icon-container">
            {
                list?.iconImg?.length > 1 ?
                <img src={list?.iconImg} alt="icon-img" />
                : <FaReddit className="list-iconImg" />
            }
            
        </div>
        <p className="list-prefix">{list?.prefix}</p>
        </article>
        </Link>
    )
}

export default AllReddits;