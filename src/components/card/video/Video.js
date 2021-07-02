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
                if (vidControlsRef.current !== null) {
                    for (let i = vidControlsRef.current.children.length -2; i >= 0; i--) {
                        vidControlsRef.current.children[i].style.opacity = 1;
                    }
                }
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                if (vidControlsRef.current !== null) {
                    for (let i = vidControlsRef.current.children.length -2; i >= 0; i--) {
                        vidControlsRef.current.children[i].style.opacity = 0;
                    }
                }
            }, 5000);
        };
        if (vidRef.current !== null && giantRef.current !== null) {
        giantRef.current.addEventListener('mousemove', displayOpa) || vidRef.current.addEventListener('mousemove', displayOpa);
        }
        return () => {
            if (vidRef.current !== null && giantRef.current !== null) {
            giantRef.current.addEventListener('mousemove', displayOpa) || vidRef.current.removeEventListener('mousemove', displayOpa);
            }
        };
    })

    useEffect(() => {
        if (vidRef.current !== null) {
            if (playing) {
                vidRef.current.play()
            } else {
                vidRef.current.pause()
            }
        }
    }, [playing]);

    useEffect(() => {
        if (vidRef.current !== null) {
            if (looping) { 
                vidRef?.current?.addEventListener('ended', loopingEffect)
            }
        }
        return () => {
            if (vidRef.current !== null) {
                if (looping) {
                    vidRef?.current?.removeEventListener('ended', loopingEffect) // crucial dont mind the warning
                }
            }
        }
    }); 

    useEffect(() => {
        if (vidRef.current !== null && sliderRef.current !== null && giantRef.current !== null) {
            vidRef?.current?.addEventListener('timeupdate', (e) => {
                if (giantRef.current !== null && vidRef.current !== null && sliderRef.current !== null) {
                    giantRef.current.style.display = "none";
                    setTime(Math.floor(vidRef?.current?.currentTime));
                    sliderRef.current.value  = (100 / vidRef?.current?.duration) * vidRef?.current?.currentTime;
                }

            })
            if (sliderRef.current !== null) {
                sliderRef?.current?.addEventListener('change', (e) => {
                    if (sliderRef.current !== null && vidRef.current !== null) {
                        const slideValue = parseInt(sliderRef.current.value);
                        const point = slideValue / (100 / vidRef?.current?.duration);
                        vidRef.current.currentTime = point
                    }
                })
            }
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