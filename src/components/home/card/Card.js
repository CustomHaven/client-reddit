import './Card.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage, } from "react-icons/ti";
import { selectPost } from '../../../feature/post/postSlice';
import Post from './post/Post.js';


const Card = (props) => {
    const { home, index, rgx, formatter, commentsHandler, replyHandler, divPress, referance, repliesClick } = props;

    // const genId = uuidv4();
    

    const allPost = useSelector(selectPost)


    return (
        <>
        <ul className="reddit-ul" >
                        
            <li className="reddit-li" key={home.id}>
                <div className="reddit-score">
                    <TiArrowUpOutline className="icon-action" />
                    <span>Score: {formatter(home.score)}</span>
                    <TiArrowDownOutline className="icon-action" />
                </div>
                
                <p className='reddit-subreddit'>{home.name}</p>
                <p className='reddit-title'>{home.title}</p>
                { 
                    rgx.test(home.url) && 
                    <div className="reddit-img-container" >
                    <img src={home.url} alt="home img"/>
                    </div>
                }

                {
                    home.comments > 0 && ///// here is the comments im trying to click on to just display 1
                    <div //this is the div I want the click to happen with
                        ref={referance} 
                        key={home.id}
                        value={home.permalink} 
                        onClick={(e) => commentsHandler(home.permalink, index)} 
                        className="reddit-comments target-divs"
                    >
                        <TiMessage className="reddit-symbol"/>
                        {/* <svg value={home.permalink} className="reddit-symbol" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path value={home.permalink} d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg> */}
                        <p value={home.permalink}>Comments {formatter(home.comments)}</p>
                    </div> // why i put home.permalink on all is because if I click on comment without that value then it doesnt register it only show what inside p has
                } 
                    {/* THE ABOVE DIV IS WHAT I WANT THE EVENT CLICK TO ONLY TRIGGER FOR 1 DIV ONLY */}

                <p className='reddit-author'>{home.author}</p>
            </li>


        
        </ul>

        <Post 
            divPress={divPress}
            allPost={allPost}
            index={index}
            home={home}
            replyHandler={replyHandler}
            repliesClick={repliesClick}
        />

        </>
    )
}

export default Card;