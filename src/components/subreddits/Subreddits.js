import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading.js';
import { subredditsThunk, selectSubIsLoading, selectSubreddits } from '../../feature/subreddits/subredditsSlice.js';
import { postThunk, repliesList, clearAllReplies, indexReset } from '../../feature/post/postSlice.js';
import { formatter } from '../../util/mathWork.js';
import '../home/Home.css';
import Card from '../card/Card.js';
import { backgroundPics } from '../../util/imagesContainer.js';

const Subreddits = () => {

    const {prefix} = useParams();
    const [divPress, setDivPress] = useState(null);
    const [repliesClick, setRepliesClick] = useState(null);
    const redditLoading = useSelector(selectSubIsLoading)
    const subreddit = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const [foundImg, setFoundImg] = useState('');

    useEffect(() => {        
        dispatch(subredditsThunk(prefix));
    }, [dispatch, prefix]);

    const body = document.body;
    const found = backgroundPics.find(d => d.name === prefix);

    useEffect(() => {
        setFoundImg(found !== undefined ? found.img : backgroundPics[4].img)
    }, [found, foundImg])

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

    body.style.backgroundImage = `url(${foundImg}`;
    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (redditLoading) {
        return <Loading />
    }
    
    return (
        <>
            {
                subreddit.map((reddit, index) => 
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

export default Subreddits;