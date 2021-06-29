import React from 'react';
import { Link } from 'react-router-dom';
import { FaReddit } from "react-icons/fa";

const ListOfAllReddit = (props) => {
    const { allList } = props;

    return (
        <aside className="list-all">
        <div id="aside-title">
        <h1 className="aside-title">More Subreddits</h1>
        </div>
        {
            allList.map((list, index) => 
                <article key={list?.id} className="article-map">
                <Link to={`/dragon/${list?.name}`} className="all-links">
                <div className="list-icon-container">
                    {
                        list?.iconImg?.length > 1 ?
                        <img src={list?.iconImg} alt="icon-img" />
                        : <FaReddit className="list-iconImg" />
                    }
                    
                </div>
                </Link>
                <Link to={`/dragon/${list?.name}`} className="all-links">
                <p className="list-prefix">{list?.prefix}</p>
                </Link>
                </article>
            )
        }
        </aside>
    )
}

export default ListOfAllReddit;