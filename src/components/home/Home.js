import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { homeSubredditThunk, selectHome } from '../../feature/home/homeSlice.js'

const Home = () => {

    

    const subHome = useSelector(selectHome);
    const dispatch = useDispatch();

    console.log(subHome);

    
    useEffect(() => {
       dispatch(homeSubredditThunk());
    }, [dispatch]);
    console.log(subHome);
    // const regexValidation = /\.jpg$/
    
    return (
        <div style={{position: 'relative', top: '200px'}}>
            <h1>Welcome to the Home Page {subHome.subreddit}</h1>

            <ul>
                {
                    subHome.map(home => 
                    <li key={home.id}>
                        <span>{home.subreddit}</span>
                        <p>{home.title}</p>
                        <img src={home.url} alt="no img"/>
                        <p>{home.author}</p>
                    </li>)
                }
            </ul>

            
        </div>
    )
}


export default Home;