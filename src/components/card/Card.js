import './Card.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage, } from "react-icons/ti";
import { selectPost } from '../../feature/post/postSlice';
import Post from './post/Post.js';
import { timeAgo } from '../../util/mathWork.js';

const Card = (props) => {
    const { subreddit, index, rgx, formatter, commentsHandler, replyHandler, divPress, referance, repliesClick } = props;

    const allPost = useSelector(selectPost)

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
                    <div className="smallsizeImage">
                        <img 
                            src="https://b.thumbs.redditmedia.com/rwN0al9P6nYhGSQO-yIJb-FyF5xg-c2v61zjMom4c4E.png" 
                            alt="noimg" />
                    </div>
                    <p>{subreddit.prefix}</p>
                </div>
                
                <p className='reddit-title'>{subreddit.title}</p>
                { 
                    rgx.test(subreddit.url) && 
                    <div className="reddit-img-container" >
                    <img src={subreddit.url} alt="subreddit img"/>
                    </div>
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