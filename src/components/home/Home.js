import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Home.css';
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import { colorNum, formatter } from '../../util/mathWork.js';
import reddit from '../../util/reddit-data';

const Home = () => {

    console.log(reddit.getPopular())

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.addEventListener('load', () => {
            dispatch(homeSubredditThunk());
        })
        return () => {
            window.removeEventListener('load', () => {
                dispatch(homeSubredditThunk());
            })
        }
    }, [dispatch]);


    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }

    
    return (
        <>

            {
                subHome.map(home => 
                    
                    <div 
                        style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}
                        className="reddit-div">
                        

                        <ul className="reddit-ul" >
                            
                                
                                <li 
                                // style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()})`}}                                 
                                className="reddit-li" key={home.id}>
                                    <span className="reddit-score">Score: {formatter(home.score)}</span>
                                    <p className='reddit-subreddit'>{home.name}</p>
                                    <p className='reddit-title'>{home.title}</p>
                                    { 
                                        regexValidation.test(home.url) && 
                                        <div className="reddit-img-container" >
                                        <img src={home.url} alt="home img"/>
                                        </div>
                                    }

                                    {
                                        home.comments > 0 &&
                                        <div className="reddit-comments"><svg className="reddit-symbol" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
                                        <p>Comments {formatter(home.comments)}</p></div>
                                    }


                                    <p className='reddit-author'>{home.author}</p>
                                </li>
                        
                        </ul>

                        
                    </div>
                )
            }
        </>
    )
}


export default Home;

// style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}