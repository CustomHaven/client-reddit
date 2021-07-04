import React from 'react';
import { v4 } from 'uuid';
import { TiArrowUpOutline, TiArrowDownOutline, TiMessage, } from "react-icons/ti";

const Loading = () => {
    const array1 = new Array(20).fill(10, 0, 20)
    return (
        <>
            {
                array1.map((arr) => 
                    <div className="reddit-div" key={v4()}>
                        <ul className="reddit-ul" >
                        
                        <li className="reddit-li" key="23ce2">
                            <div className="reddit-score">
                                <TiArrowUpOutline className="icon-action loading" />
                                <span className="loading">Score: 10m</span>
                                <TiArrowDownOutline className="icon-action loading" />
                            </div>
                            <p className="reddit-time-utc loading">{arr} seconds ago</p>
                            <div className='reddit-subreddit'>
                                <div className="loading">                                    
                                    <div className="smallsizeImage loading"></div>
                                </div>
                                <p className="loading">r/loading</p>
                            </div>
                            
                            <p className='reddit-title loading'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="reddit-img-container loading" >
                                <div className="loading"></div>
                            </div>
                         
                                
                                <div className="reddit-comments target-divs"
                                >
                                    <TiMessage className="reddit-symbol loading"/>
                                    
                                    <p className="loading" value>Comments 100</p>
                                </div>
                         
            
                            <p className='reddit-author loading'>AUTHOR</p>
                        </li>
            
                        </ul>
                </div>)
            }
        
           

        </>
    )
}


export default Loading;