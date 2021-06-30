import React, { useState, useEffect, useRef } from 'react';
import './Video.css';

const VideoiOS = (props) => {
    const { src } = props;
    // Boolean to see if client is using iOS so we dont render custom controls because iOS dont support it
    // const iOS = /^(iPhone|iPad|iPod)/.test(navigator.userAgent || navigator.vendor || navigator.platform); 

    return (
                    
                <div className="reddit-img-container" id="video-container">
                <video id="video-player" src={src} type="video/mp4" className="video" loop controls ></video>
                </div>
                
    )
}

export default VideoiOS;