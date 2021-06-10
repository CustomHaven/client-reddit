import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { homeSubredditThunk, selectHome } from '../../feature/home/homeSlice.js'

const Home = () => {

    const subHome = useSelector(selectHome);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(homeSubredditThunk())
    }, [dispatch]);

    console.log(subHome);
    // useEffect(() => {
    //     reddit.getPopular().then(img => setImages(img))
    // }, [images])

    // console.log(homeSubreddit)
    // console.log(reddit.getHome())

    // console.log(images)
    // const regexValidation = /\.jpg$/
    // const children = 
    // for (let i = 0; i < children.length; i++) {
    //     console.log(children[i].match(regexValidation))
    // }
    return (
        <div style={{position: 'relative', top: '200px'}}>
            <h1>Welcome to the Home Page</h1>
            
            {/* {
                images.map((child, index) => 
                        <img key={index} src={child.data.url_overridden_by_dest} alt="not img" />)
            } */}
            
        </div>
    )
}


export default Home;