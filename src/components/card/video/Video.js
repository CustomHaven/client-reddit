import React, { useState, useEffect, useRef } from 'react';
import './Video.css';
import VideoPresentation from './videoPresentation/VideoPresentation';

const Video = (props) => {
    const { src, duration } = props;
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [looping, setLooping] = useState(false);
    const [displayCog, setDisplayCog] = useState(false);
    const vidRef = useRef();
    const sliderRef = useRef();
    const fullScreen = useRef();
    const vidControlsRef = useRef();
    const giantRef = useRef();

    useEffect(() => {
        let timeout = 0;

        const displayOpa = () => {
            for (let i = vidControlsRef.current.children.length -2; i >= 0; i--) {
                vidControlsRef.current.children[i].style.opacity = 1;
            }
            clearTimeout(timeout);

            timeout = setTimeout(() => {
            for (let i = vidControlsRef.current.children.length -2; i >= 0; i--) {
                vidControlsRef.current.children[i].style.opacity = 0;
            }
            }, 5000);
        };

        giantRef.current.addEventListener('mousemove' || 'touchmove', displayOpa) || vidRef.current.addEventListener('mousemove' || 'touchmove', displayOpa);

        return () => {
            giantRef.current.addEventListener('mousemove' || 'touchmove', displayOpa) || vidRef.current.removeEventListener('mousemove' || 'touchmove', displayOpa);
        };
    })

    useEffect(() => {
        if (vidRef.current !== undefined) {
            if (playing) {
                vidRef.current.play()
            } else {
                vidRef.current.pause()
            }
        }
    }, [playing]);

    useEffect(() => {
        if (looping) { 
            vidRef?.current?.addEventListener('ended', loopingEffect)
        } 
        return () => {
            if (looping) {
                vidRef?.current?.removeEventListener('ended', loopingEffect) // crucial dont mind the warning
            }
        }
    }); 

    useEffect(() => {
        if (vidRef.current !== undefined) {
            vidRef?.current?.addEventListener('timeupdate', (e) => {
                giantRef.current.style.display = "none";
                setTime(Math.floor(vidRef?.current?.currentTime));
                sliderRef.current.value  = (100 / vidRef?.current?.duration) * vidRef?.current?.currentTime;
            })
            sliderRef?.current?.addEventListener('change', (e) => {
                const slideValue = parseInt(sliderRef.current.value);
                const point = slideValue / (100 / vidRef?.current?.duration);
                vidRef.current.currentTime = point
            })
        }
    }, [vidRef, sliderRef])

    const quickStart = (e) => {
        setPlaying(!playing)
    }

    const keyQuickStart = (e) => {
        if (document.fullscreenElement) {
            if (e.keyCode === 32 || e.keyCode === 13) {
                setPlaying(!playing)
            }
        }
    }

    const toggleFullScreen = () => {         
        if (!document.fullscreenElement) {
            fullScreen.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    const toggleCog = () => {
        setDisplayCog(!displayCog)
    }

    const toggleLoop = () => {
        setDisplayCog(false)
        if (!vidRef.current !== duration) {
            vidRef.current.play()
            setLooping(true)
            setPlaying(true)
        }
        if (looping) {
            setLooping(false);
            setPlaying(false)
        }
    }
    
    const togglePlay = () => {
        if (playing) {
            setPlaying(false)
        } 
        if (!playing) {
            setPlaying(true)
        }
    }

    const loopingEffect = () => {
        vidRef.current.currentTime = 0
        vidRef.current.play()
    }

    const giantHandler = (e) => {
        setPlaying(true);
        // setDisplayGiant(false);
        console.log("bye bye giant clicked")
    }

    return (
        <>            
            <VideoPresentation 
                fullScreen={fullScreen}
                keyQuickStart={keyQuickStart}
                quickStart={quickStart}
                vidRef={vidRef}
                src={src}
                playing={playing}
                togglePlay={togglePlay}
                time={time}
                sliderRef={sliderRef}
                duration={duration}
                displayCog={displayCog}
                toggleLoop={toggleLoop}
                looping={looping}
                toggleCog={toggleCog}
                toggleFullScreen={toggleFullScreen}
                vidControlsRef={vidControlsRef}
                giantRef={giantRef}
                giantHandler={giantHandler}
            />
        </>
    )
}

export default Video;