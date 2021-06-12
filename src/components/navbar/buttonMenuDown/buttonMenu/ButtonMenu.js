import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { subredditsListThunk, selectSubredditsList } from '../../../../feature/subredditsList/subredditsList.js';

export const ButtonMenu = () => {

    const subreddit = useSelector(selectSubredditsList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subredditsListThunk())
    }, [dispatch]);


    return (
        <div role="menu" className="div-menu">
        <input className="input-div-menu" type="text" placeholder="Filter REDUX for r/whatever subredit" />
        <ul className="ul-menu" role="menu">
            {
                subreddit.map((reddit, index) => 
                        <Link to={`/dragon/${reddit.name}`} className="all-links" key={reddit.id}>
                            <li className="li-menu" role="menuitem">{reddit.prefix}</li>
                        </Link>
                )
            }
        </ul>
    </div>
    )
}