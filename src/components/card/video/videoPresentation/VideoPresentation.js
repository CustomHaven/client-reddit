import React from 'react';
import { FaReddit, FaPlay, FaPause, FaCog } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import { GiSoundOff } from "react-icons/gi";
import { Button } from "@chakra-ui/react";
import { clock } from '../../../../util/mathWork.js';

const VideoPresentation = (props) => {
    const { 
        fullScreen,
        keyQuickStart,
        quickStart,
        vidRef,
        src,
        vidControlsRef,
        playing,
        togglePlay,
        time,
        sliderRef,
        duration,
        displayCog,
        toggleLoop,
        looping,
        toggleCog,
        toggleFullScreen,
        giantRef,
        giantHandler,
    } = props;
    return (
        <>
            {  
                <div ref={fullScreen} className="reddit-img-container" id="video-container">

                    <video tabIndex={0} onKeyDown={keyQuickStart} onClick={quickStart} ref={vidRef} id="video-player" src={src} type="video/mp4" className="video" >

                    </video>
                    <div ref={giantRef} id="giant-container">
                        <div onClick={giantHandler} className="giant-container">
                            <div id="giant-circle"></div>
                            <div id="giant-play-button"></div>
                        </div>
                    </div>
                    
                    <div ref={vidControlsRef} id="video-controls">
                        <div className="video-controls-background"></div>
                        <Button bg="transparent" colorScheme="transparent" 
                            className="video-button video-control every-button"                        
                        >
                            <FaReddit className="logo-attr logo-video" />
                        </Button>
                        {
                            !playing ?
                            <Button border="transparent" boxShadow="transparent" onClick={togglePlay} colorScheme="transparent"
                                className="video-button video-control every-button"                        
                            >
                                <FaPlay className="logo-attr" />
                            </Button> :
                            <Button border="transparent" boxShadow="transparent" onClick={togglePlay} colorScheme="transparent"
                                className="video-button video-control every-button"                        
                            >
                                <FaPause className="logo-attr" />
                            </Button>
                        }                        
                        <span className="video-control">{clock(time)}</span>
                        <input ref={sliderRef} className="video-control slider-input" type="range" />
                        <span className="video-control">{clock(duration)}</span>
                        <div className="video-button video-control cog-container">
                        {
                            displayCog &&
                            <>
                            <div className="cog-info">
                                <span>No Sound</span>
                                <span onClick={toggleLoop}>{!looping ? 'Loop' : 'Stop Looping'}</span>
                            </div>
                            <div className="cog-pointer"></div>
                            </>
                        }
                        
                        <Button colorScheme="transparent" 
                            className="video-button video-control every-button"                        
                        >
                            <FaCog onClick={toggleCog} className="logo-attr" />
                        </Button></div>
                        <Button onClick={toggleFullScreen} colorScheme="transparent" 
                            className="video-button video-control every-button"                        
                        >
                            <BiFullscreen className="logo-attr" />
                        </Button>
                        <Button colorScheme="transparent" 
                            className="video-button video-control every-button sound-button"                        
                        >
                            <GiSoundOff className="logo-attr sound" />
                        </Button>
                    </div>

                </div>
            }
        </>
    )
}

export default VideoPresentation;