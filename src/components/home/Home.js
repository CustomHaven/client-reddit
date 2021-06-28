import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Home.css';
import { Spinner } from "@chakra-ui/react";
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import { postThunk, repliesList, clearAllReplies, indexReset } from '../../feature/post/postSlice';
import { formatter } from '../../util/mathWork.js';
import Card from '../card/Card.js';
import { backgroundPics } from '../../util/imagesContainer.js';

const Home = () => {

    // console.log(reddit.getPost());
    const [divPress, setDivPress] = useState(null);
    const [repliesClick, setRepliesClick] = useState(null);
    // const [divReddit, setDivReddit] = useState('');

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);
    const refDivClick = useRef([document.getElementsByClassName('target-divs')]); // might just delete // only sendinf 1 back wtf

    const dispatch = useDispatch();
    // console.log(refDivClick)
    
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
        return <Spinner
        thickness="40px"
        speed="1s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    }

    
    return (
        <>

            {
                subHome.map((home, index) => 
                    <div 
                        // style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.8)`}}
                        className="reddit-div">
                        <Card 
                            // key={uuidv4()}
                            index={index}
                            subreddit={home}
                            rgx={regexValidation}
                            formatter={formatter}
                            commentsHandler={commentsHandler}
                            replyHandler={replyHandler}
                            divPress={divPress}
                            referance={refDivClick}
                            repliesClick={repliesClick}
                        /> 
                    </div>
                )
            }
        </>
    )
}


export default Home;

// style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}