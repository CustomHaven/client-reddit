import React, { useState, useEffect, useRef } from 'react';
import './Video.css';
import { FaReddit, FaPlay, FaPause, FaCog } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import { AiOutlineSound } from "react-icons/ai";
import { GiSoundOff } from "react-icons/gi";
import { Button } from "@chakra-ui/react";
import { clock } from '../../../util/mathWork.js';
import screenfull from 'screenfull';

const Video = (props) => {
    const { src, duration } = props;
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const vidRef = useRef();
    const sliderRef = useRef();
    const fullScreen = useRef();

    useEffect(() => {
        if (vidRef.current !== undefined) {
            if (playing) {
                vidRef.current.play()
            } else {
                vidRef.current.pause()
            }

        }
    }, [playing, vidRef]);
    

    useEffect(() => {
        if (vidRef.current !== undefined) {
            vidRef?.current?.addEventListener('timeupdate', (e) => {
                // console.log(e),
                setTime(Math.round(vidRef?.current?.currentTime));
                sliderRef.current.value  = (100 / vidRef?.current?.duration) * vidRef?.current?.currentTime
               
                // console.log(sliderRef)
                // setSlide(sliderRef.current)
            })
            sliderRef?.current?.addEventListener('change', (e) => {
                // setSlide(Math.round(e.timeStamp))
                const slideValue = parseInt(sliderRef.current.value);

                const point = slideValue / (100 / vidRef?.current?.duration);
                vidRef.current.currentTime = point
            })
        }
    }, [vidRef, sliderRef])

    // const toggleFullScreen = () => {
        // screenfull.toggle(vidRef.current)
    // }

    return (
        <div className="reddit-img-container" ref={fullScreen} id="video-container">
            <video ref={vidRef} id="video-player" src={src} type="video/mp4" className="video" loop></video>
                {
                    
                    <div id="video-controls">
                        <div className="video-controls-background"></div>
                        <Button colorScheme="transparent" 
                            className="video-button video-control"                        
                        >
                            <FaReddit className="logo-attr logo-video" />
                        </Button>

                        {
                            !playing ?
                            <Button onClick={() => setPlaying(value => !value)} colorScheme="transparent" 
                                className="video-button video-control"                        
                            >
                                <FaPlay className="logo-attr" />
                            </Button> :
                            <Button onClick={() => setPlaying(value => !value)} colorScheme="transparent" 
                                className="video-button video-control"                        
                            >
                                <FaPause className="logo-attr" />
                            </Button>

                        }
                        
                        <span className="video-control">{clock(time)}</span>
                        <input ref={sliderRef} className="video-control" type="range" />
                        <span className="video-control">{clock(duration)}</span>
                        <Button colorScheme="transparent" 
                            className="video-button video-control"                        
                        >
                            <FaCog className="logo-attr" />
                        </Button>
                        <Button colorScheme="transparent" 
                            className="video-button video-control"                        
                        >
                            <BiFullscreen className="logo-attr" />
                        </Button>
                        <Button colorScheme="transparent" 
                            className="video-button video-control"                        
                        >
                            <GiSoundOff className="logo-attr sound" />
                        </Button>
                    </div>
                }
        </div>
    )
}

export default Video;