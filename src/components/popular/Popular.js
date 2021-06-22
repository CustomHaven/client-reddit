import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import '../home/Home.css';
import { selectPopular, selectPopLoading, popularThunk } from '../../feature/popular/popularSlice.js';
import { colorNum, formatter } from '../../util/mathWork.js';
import { backgroundPics } from '../../util/imagesContainer.js';
import reddit from '../../util/reddit-data';

const Popular = () => {

    console.log(reddit.getPopular())

    const loading = useSelector(selectPopLoading);
    const popular = useSelector(selectPopular);

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

    const body = document.body;
    body.style.backgroundImage = `url(${backgroundPics[4].img}`;

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }


    
    return (
        <>
            {
                popular.map(pop => 
                    
                    <div 
                        style={{backgroundColor: `rgb(${colorNum()}, ${colorNum()}, ${colorNum()})`}}
                        className="reddit-div">
                        

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