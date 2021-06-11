import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { subredditsThunk, selectSubIsLoading, selectSubreddits } from '../../feature/subreddits/subredditsSlice.js'

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
        <div style={{position: 'relative', top: '200px'}}>
            <h1>Welcome to any Subreddit Page </h1>

            <ul>
                {
                    subreddit.map(home => 
                    <li key={home.id}>
                        <span>{home.subreddit + " subreddit"}</span>
                        <p>{home.title + " title"}</p>
                        { 
                            regexValidation.test(home.url) && 
                            <img src={home.url} alt="no img"/>
                        }
                        <p>{home.author + " author"}</p>
                    </li>)
                }
            </ul>

            
        </div>
    )
}


export default Subreddits;