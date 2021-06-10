import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js'

const Home = () => {

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(homeSubredditThunk());
    }, [dispatch]);

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading === true) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }
    // const regexValidation = /\.jpg$/


    
    return (
        <div style={{position: 'relative', top: '200px'}}>
            {/* <h1>Welcome to the Home Page {!loading ? subHome[0].prefix : null}</h1> */}

            <ul>
                {
                    subHome.map(home => 
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


export default Home;