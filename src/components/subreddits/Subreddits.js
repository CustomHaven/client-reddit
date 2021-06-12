import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { subredditsThunk, selectSubIsLoading, selectSubreddits } from '../../feature/subreddits/subredditsSlice.js';
import randomNum from '../../util/randomNumbers.js';
import '../home/Home.css';

const Subreddits = () => {

    const {prefix} = useParams();
    console.log(prefix)
    const redditLoading = useSelector(selectSubIsLoading)
    const subreddit = useSelector(selectSubreddits);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subredditsThunk(prefix))
    }, [dispatch]);

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (redditLoading === true) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }


    // console.log(subreddit)


    
    return (
        <>
            <h1 style={{position: 'relative', top: '200px'}}>Welcome to the reddit Page </h1>
            {
                subreddit.map(reddit => 
                    <div 
                        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}} 
                        className="reddit-div">
                        

                        <ul className="reddit-ul" >
                            
                                
                                <li className="reddit-li" key={reddit.id}>
                                    <span className='reddit-subreddit'>{reddit.subreddit}</span>
                                    <p className='reddit-title'>{reddit.title}</p>
                                    { 
                                        regexValidation.test(reddit.url) && 
                                        <div className="reddit-img-container">
                                        <img src={reddit.url} alt="no img"/>
                                        </div>
                                    }
                                    <p className='reddit-author'>{reddit.author}</p>
                                </li>
                        
                        </ul>

                        
                    </div>
                )
            }
        </>
    )
}


export default Subreddits;