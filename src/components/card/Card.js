import './Card.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage, } from "react-icons/ti";
import { FaReddit } from "react-icons/fa";
import { selectPost } from '../../feature/post/postSlice';
import { selectListOfAll } from '../../feature/listOfAll/listOfAllSlice';
import Post from './post/Post.js';
import Video from './video/Video.js'
import { timeAgo } from '../../util/mathWork.js';

const Card = (props) => {
    const { subreddit, index, rgx, formatter, commentsHandler, replyHandler, divPress, referance, repliesClick } = props;
    const allList = useSelector(selectListOfAll);
    const allPost = useSelector(selectPost);

    const location = useLocation();
    const path = location.pathname;

    const regex = /(\/dragon)?\//i;
    const regexResult = path.replace(regex, '');
    const idx = allList.findIndex(child => child.name === regexResult);

    // console.log(subreddit?.video)
    // console.log(subreddit)

    return (
        <>
        <ul className="reddit-ul" >
                        
            <li className="reddit-li" key={subreddit.id}>
                <div className="reddit-score">
                    <TiArrowUpOutline className="icon-action" />
                    <span>Score: {formatter(subreddit.score)}</span>
                    <TiArrowDownOutline className="icon-action" />
                </div>
                <p className="reddit-time-utc">{timeAgo(subreddit.utc * 1000)}</p>
                <div className='reddit-subreddit'>
                    <div>
                        {
                            idx === -1 ?
                            <FaReddit className="smallsizeImage" />
                            :
                            allList[idx]?.iconImg?.length > 0 ?
                            <img 
                                className="smallsizeImage"
                                src={allList[idx]?.iconImg} 
                                alt="noimg" />
                                : <FaReddit className="smallsizeImage" />
                        }
                    </div>
                    <p>{subreddit.prefix}</p>
                </div>
                
                <p className='reddit-title'>{subreddit.title}</p>
                { 
                    (subreddit?.video !== undefined || rgx.test(subreddit.url)) ? 
                    
                    
                        subreddit?.video !== undefined ?
                        <Video 
                            src={subreddit?.video}
                            // duration={subreddit?.duration}
                        /> :
                        <div className="reddit-img-container" >
                    <img src={subreddit.url} alt="subreddit img"/>
                    </div>
                    
                    : null
                }

                {
                    subreddit.comments > 0 &&
                    <div 
                        ref={referance} 
                        key={subreddit.id}
                        value={subreddit.permalink} 
                        onClick={(e) => commentsHandler(subreddit.permalink, index)} 
                        className="reddit-comments target-divs"
                    >
                        <TiMessage className="reddit-symbol"/>
                        
                        <p value={subreddit.permalink}>Comments {formatter(subreddit.comments)}</p>
                    </div>
                } 

                <p className='reddit-author'>{subreddit.author}</p>
            </li>

        </ul>

        <Post 
            divPress={divPress}
            allPost={allPost}
            index={index}
            home={subreddit}
            replyHandler={replyHandler}
            repliesClick={repliesClick}
        />

        </>
    )
}

export default Card;