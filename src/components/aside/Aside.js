import './Aside.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { formatter } from '../../util/mathWork';
import { selectListOfAll } from '../../feature/listOfAll/listOfAllSlice';
import { selectSubreddits, subredditsThunk } from '../../feature/subreddits/subredditsSlice';
import ListOfAllReddit from './listOfAllReddit/ListOfAllReddit';

const Aside = () => {
    const allList = useSelector(selectListOfAll);
    const subreddit = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (subreddit.length === 0) {
            dispatch(subredditsThunk('Home'));
        }
    }, [dispatch, subreddit]);

    const regex = /(\/dragon)?\//i;
    const regexResult = path.replace(regex, '');
    const index = allList?.findIndex(child => child.name === regexResult);

    return (
        <div className="aside-container">
        <aside className="public-info">
            <div className="dark-div">
                <h2>About Community</h2>
                <div className="dot-container">
                    <div className="white-dot"></div>
                    <div className="white-dot"></div>
                    <div className="white-dot"></div>
                </div>
            </div>
            <p className="pub-info" >{index !== -1 
                ? allList[index]['publicInfo'].length > 0 ? allList[index].publicInfo : 'Everything home related..'
                : 'Everything home related..'}</p>

            <p className="total-subs" >Total Subscribers: {subreddit.length > 0 && formatter(subreddit[0].subscribers)}</p>
            

        </aside>
        <ListOfAllReddit
            allList={allList}
        />
        </div>
    )
}

export default Aside;