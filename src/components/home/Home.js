import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import './Home.css';
// import { nameList, selectNameList, selectSubredditsList, subredditsListThunk } from '../../feature/subredditsList/subredditsListSlice.js';
import { homeSubredditThunk, selectHome, isLoading } from '../../feature/home/homeSlice.js';
import randomNum from '../../util/randomNumbers.js';

const Home = () => {

    const loading = useSelector(isLoading);
    const subHome = useSelector(selectHome);
    // const design = useRef();
    // const work = useRef();
    // const bannerPic = useRef();

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.addEventListener('load', () => {
            
        })
        return () => {
            window.removeEventListener('load', () => {
                dispatch(homeSubredditThunk());
            })
        }
        // dispatchs(subredditsListThunk())
        // calling dispatch again but in the second useEffect without any dependancy
    }, [dispatch]);



    // useEffect(() => {
        // if (theNameList !== {}) {
            // console.log(subHome.find(child => child.name) + " useEffect")
            // console.log(subHome.find(child => child.name))
            // console.log(subHome.find(child => child.name) + " useEffect")
            // design.current = dispatchs(nameList(subHome.find(child => child.name)));
            // console.log(design.current.payload);
        // }
    // });

    // console.log(theNameList)
    // console.log(list);

    // console.log(param)

    // let design;
    // console.log(redditList)
    // let work = [];
    // useEffect(() => {
        // if (design.current.payload !== undefined) {
            // console.log("yaaahooo we are in here");
            // work.current = (redditList.find(child => child.name === design.current.payload.name));
            // console.log(work.current)
            // design.current = redditList.find(child => child.name === theNameList.name);
        // }
        // if (design.current !== undefined) {
            // console.log(design.current)
        // }
    // });



    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (loading) {
        return <div style={{position: 'relative', top: '50vh', left: '50vw'}}>Loading...</div>
    }
    // const regexValidation = /\.jpg$/
    // let found;
    // let bannerImg;
    // if (work.current !== undefined) {
        // bannerPic.current = Object.entries(work.current).sort().find(ob => ob).filter(o => o !== "bannerImg");
        // found = work.current.find(done => done.bannerImg);
        // done.current = found;
        // console.log('found area')
        // console.log(bannerPic.current)
    // }


    
    return (
        <>

            <h1>hello home</h1>
            {/* Welcome to the reddit Page {theNameList !== undefined && theNameList.name}</h1> */}
            {/* <h1 style={{position: 'relative', top: '200px'}}>Welcome to the Home Page {list !== undefined && list.name}</h1> */}
            {/* <div style={{backgroundImage: `${images.bannerImg}`}}></div> */}
            {
                subHome.map(home => 
                    
                    <div 
                        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}
                        className="reddit-div">
                        

                        <ul className="reddit-ul" >
                            
                                
                                <li 
                                // style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`}}                                 
                                className="reddit-li" key={home.id}>
                                    <p className='reddit-subreddit'>{home.name}</p>
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