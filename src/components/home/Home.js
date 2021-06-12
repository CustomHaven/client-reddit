import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import './Home.css'
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import randomNum from '../../util/randomNumbers.js'

const Home = () => {

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);

    const param = useParams();

    console.log(param)

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(homeSubredditThunk());
    }, [dispatch]);

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <div style={{position: 'relative', top: '50vh', left: '50vw'}}>Loading...</div>
    }
    // const regexValidation = /\.jpg$/


    
    return (
        <>
            <h1 style={{position: 'relative', top: '200px'}}>Welcome to the Home Page </h1>
            {
                subHome.map(home => 
                    
                    <div 
                        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}
                        className="reddit-div">
                        

                        <ul className="reddit-ul" >
                            
                                
                                <li 
                                // style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`}}                                 
                                className="reddit-li" key={home.id}>
                                    <p className='reddit-subreddit'>{home.subreddit}</p>
                                    <p className='reddit-title'>{home.title}</p>
                                    { 
                                        regexValidation.test(home.url) && 
                                        <div className="reddit-img-container" >
                                        <img src={home.url} alt="no img"/>
                                        </div>
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

// style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}