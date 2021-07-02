import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import '../home/Home.css';
import { Spinner } from "@chakra-ui/react";
import { selectPopular, selectPopLoading, popularThunk } from '../../feature/popular/popularSlice.js';
import { postThunk, repliesList, clearAllReplies, indexReset } from '../../feature/post/postSlice';
import Card from '../card/Card.js';
import { colorNum, formatter } from '../../util/mathWork.js';
import { backgroundPics } from '../../util/imagesContainer.js';
import reddit from '../../util/reddit-data';

const Popular = () => {

    console.log(" we are dropping this component cant be asked wid it :@@@@@@@@@@@@@@@@")

    console.log(reddit.getPopular())

    const [divPress, setDivPress] = useState(null);
    const [repliesClick, setRepliesClick] = useState(null);

    const loading = useSelector(selectPopLoading);
    const popular = useSelector(selectPopular);

    const refDivClick = useRef([document.getElementsByClassName('target-divs')]);// will delete see what happens

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.addEventListener('load', () => {
            dispatch(popularThunk());
        })
        return () => {
            window.removeEventListener('load', () => {
                dispatch(popularThunk());
            })
        }
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
        <h1>FORGET POPULAR</h1>
            {
                popular.map((pop, index) => 
                    
                    <div className="reddit-div">
                        
                    {/* <Card 
                            index={index}
                            subreddit={pop}
                            rgx={regexValidation}
                            formatter={formatter}
                            commentsHandler={commentsHandler}
                            replyHandler={replyHandler}
                            divPress={divPress}
                            referance={refDivClick}
                            repliesClick={repliesClick}
                    />  */}

                        <ul className="reddit-ul" >
                            
                                
                                <li 
                                // style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()})`}}                                 
                                className="reddit-li" key={pop.id}>
                                    <span className="reddit-score">Score: {formatter(pop.score)}</span>
                                    <Link className="reddit-subreddit all-links" to={`/dragon/${pop.name}`}>
                                        <p>{pop.name}</p>
                                    </Link>
                                    <p className='reddit-title'>{pop.title}</p>
                                    { 
                                        regexValidation.test(pop.url) && 
                                        <div className="reddit-img-container" >
                                        <img src={pop.url} alt="no img"/>
                                        </div>
                                    }
                                    {
                                        pop.comments > 0 &&
                                        <div className="reddit-comments"><svg className="reddit-symbol" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
                                        <p>Comments {formatter(pop.comments)}</p></div>
                                    }

                                    <p className='reddit-author'>{pop.author}</p>
                                </li>
                        
                        </ul>

                        
                    </div>
                )
            }
        </>
    )
}


export default Popular;

// style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}