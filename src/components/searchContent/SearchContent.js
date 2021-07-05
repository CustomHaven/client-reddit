import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './SearchContent.css';
import { ImCrying, ImShocked } from "react-icons/im";
import Loading from '../loading/Loading.js';
import { selectSearch, selectSearchLoading } from '../../feature/search/searchSlice.js';
import { postThunk, repliesList, clearAllReplies, indexReset } from '../../feature/post/postSlice.js';
import { formatter } from '../../util/mathWork.js';
import '../home/Home.css';
import Card from '../card/Card.js';

const SearchCard = () => {
    const location = useLocation();
    const [divPress, setDivPress] = useState(null);
    const [repliesClick, setRepliesClick] = useState(null);
    const loading = useSelector(selectSearchLoading);
    const search = useSelector(selectSearch);
    const dispatch = useDispatch();

    /// THIS SECTION HERE IS THE CLICK HANDLER
    const commentsHandler = (perma, index) => {
        if (divPress === index) {
            dispatch(clearAllReplies([]));
            dispatch(indexReset(0));
            setDivPress(null)
        } else {
            dispatch(clearAllReplies([]));
            dispatch(indexReset(0));
            setDivPress(index)
            dispatch(postThunk(perma));
        }
    }

    const replyHandler = (replies, index) => {
        if (repliesClick === index){
            dispatch(clearAllReplies([]));
            dispatch(indexReset(0));
            setRepliesClick(null);
        } else {
            dispatch(clearAllReplies([]));
            dispatch(indexReset(0));
            setRepliesClick(index)
            dispatch(repliesList(replies));
        }
    }

    const locationSearch = location.search;
    const regexSearch = /\?query=/i;
    const searchResult = locationSearch.replace(regexSearch, '');
    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <Loading />
    }

    if (searchResult.length === 0) {
        return ( 
            <div className="search-content-div">
                <ImShocked className="no-result-icons"/>
                <h1>sorry we have no result for “ ”</h1>
                <ImCrying className="no-result-icons"/>
            </div>
        )
    }

    if (search.length === 0) {
        return ( 
            <div className="search-content-div">
                <ImShocked className="no-result-icons"/>
                <h1>invalid input try a different search</h1>
                <ImCrying className="no-result-icons"/>
            </div>
        )
    }
    
    return (
        <>
            {
                search.map((reddit, index) => 
                    <div 
                        className="reddit-div">
                        <Card 
                            index={index}
                            subreddit={reddit}
                            rgx={regexValidation}
                            formatter={formatter}
                            commentsHandler={commentsHandler}
                            replyHandler={replyHandler}
                            divPress={divPress}
                            repliesClick={repliesClick}
                        />       
                    </div>
                )
            }
        </>
    )
}

export default SearchCard;