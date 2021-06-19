import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Home.css';
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import { postThunk } from '../../feature/post/postSlice';
import { colorNum, formatter } from '../../util/mathWork.js';
import Card from './card/Card.js';
import reddit from '../../util/reddit-data';

const Home = () => {

    console.log(reddit.getPost());
    const [divPress, setDivPress] = useState(false);

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);
    const refDivClick = useRef(null); // might just delete

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

    const commentClicked = (e) => {
        setDivPress(!divPress);
        console.log(refDivClick.current)
        console.log(e.target.attributes[0].value)
        dispatch(postThunk(e.target.attributes[0].value));
    }

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }

    
    return (
        <>

            {
                subHome.map((home, index) => 
                    <div 
                        style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}
                        className="reddit-div">
                        <Card 
                            index={index}
                            home={home}
                            rgx={regexValidation}
                            formatter={formatter}
                            commentClicked={commentClicked}
                            divPress={divPress}
                        /> 
                    </div>
                )
            }
        </>
    )
}


export default Home;

// style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}