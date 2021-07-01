import React from 'react';
import './Video.css';

const VideoiOS = (props) => {
    const { src } = props;
    return (          
        <div className="reddit-img-container" id="video-container">
            <video id="video-player" src={src} type="video/mp4" className="video" loop controls ></video>
        </div>  
    )
}

export default VideoiOS;