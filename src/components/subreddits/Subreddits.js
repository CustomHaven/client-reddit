import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { subredditsThunk, selectSubIsLoading, selectSubreddits } from '../../feature/subreddits/subredditsSlice.js';
import { selectListOfAll } from '../../feature/listOfAll/listOfAllSlice.js';
import randomNum from '../../util/randomNumbers.js';
// import reddit from '../../util/reddit-data.js';
import '../home/Home.css';

const Subreddits = () => {

    // console.log(window.location.href)
    // const allList = useSelector(selectListOfAll);
    // console.log(allList)

    const {prefix} = useParams();
    // console.log("the prefix")
    // console.log(prefix)
    // console.log("the prefix")
    const redditLoading = useSelector(selectSubIsLoading)
    const subreddit = useSelector(selectSubreddits);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(subredditsThunk(prefix));
    }, [dispatch, prefix]);

    useEffect(() => {
        // dispatch(nameList(subreddit.find(child => child.name)))
    });

    // useEffect(() => {
        // dispatch(subredditsListThunk())
    // }, [dispatch])

    // let design;
    // console.log(redditList)

    // useEffect(() => {
        // if (theNameList !== undefined) {
            // design = redditList.find(child => child.name === theNameList.name);
        // }
        // if (design !== undefined) {
            // console.log(design.bannerImg)
        // }
    // });

    // console.log(subreddit);

    const regexValidation = /\.(:?jpg|gif|png)$/;

    if (redditLoading) {
        return <div style={{position: 'relative', top: '180px'}}>Loading...</div>
    }

    // let theName;

    // if (theNameList !== undefined) {
    //     theName = redditList.find(child => child.name === theNameList.name)
    // }

    // console.log(theName)

    // console.log(theNameList);


    // console.log(subreddit)


    
    return (
        <>
            <div>
            {/* { */}
                {/* design !== undefined && */}
                {/* <img src={design.bannerImg} alt="banner-img" /> */}
            {/* } */}
                
            </div>
            <h1>Hello reddit page</h1>
            {/* Welcome to the reddit Page {theNameList !== undefined && theNameList.name}</h1> */}
            {
                subreddit.map(reddit => 
                    <div 
                        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}} 
                        className="reddit-div">
                        

                        <ul className="reddit-ul" >
                            
                                
                                <li className="reddit-li" key={reddit.id}>
                                    <span className='reddit-subreddit'>{reddit.name}</span>
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