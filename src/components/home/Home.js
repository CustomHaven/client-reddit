import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Home.css';
import Loading from '../loading/Loading.js';
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import { postThunk, repliesList, clearAllReplies, indexReset } from '../../feature/post/postSlice';
import { formatter } from '../../util/mathWork.js';
import Card from '../card/Card.js';
import { backgroundPics } from '../../util/imagesContainer.js';

const Home = () => {

    const [divPress, setDivPress] = useState(null);
    const [repliesClick, setRepliesClick] = useState(null);

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(homeSubredditThunk());
    }, [dispatch]);


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

    const body = document.body;
    body.style.backgroundImage = `url(${backgroundPics[4].img}`;
    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {
                subHome.map((home, index) => 
                    <div 
                        className="reddit-div">
                        <Card 
                            index={index}
                            subreddit={home}
                            rgx={regexValidation}
                            formatter={formatter}
                            commentsHandler={commentsHandler}
                            replyHandler={replyHandler}
                            divPress={divPress}
                            repliesClick={repliesClick}
                            loading={loading}
                        /> 
                    </div>
                )
            }
        </>
    )
}

export default Home;