import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { ButtonMenuDown } from './buttonMenuDown/ButtonMenuDown.js'
import { SearchForm } from './searchForm/SearchForm.js';
import { Nav } from './nav/Nav.js'
// import { CloseBurger } from './closeBurger/CloseBurger'
import { subredditsThunk, selectSubreddits } from '../../feature/subreddits/subredditsSlice.js';
import { useMediaQuery } from 'beautiful-react-hooks'; 

export const Navbar = () => {

    const subreddit = useSelector(selectSubreddits);
    const dispatch = useDispatch();

    
    
    const [button, setButton] = useState(false);

    useEffect(() => {
        if (button === true) {
            document.getElementById('root').addEventListener('click', buttonMenuMethod)
    
            return () => {
                window.removeEventListener('click', buttonMenuMethod)
            }
        }
    }, [button]);

    const buttonMenuMethod = () => {
        setButton(false);
    }

    const [fa_2x, setFa_2x] = useState('fa-2x');
    // const media960 = window.matchMedia( "(max-width: 960px)" );
    // media960.addEventListener('load', () => {
    //     const mq = window.matchMedia( "(max-width: 960px)" );
    //     if (mq.matches) {
    //         console.log('width below 960')
    //         setFa_2x('');
    //     } else {
    //         setFa_2x('fa-2x');
    //     }
    // });
    // const isSmall = useMediaQuery('(max-width: 960px)'); 

    // useEffect(() => {
        

    //     if (isSmall) {
    //         setFa_2x('');
    //     } else {
    //         setFa_2x('fa-2x')
    //     }
    // }, [isSmall])



    // const isLarge = useMediaQuery('(min-width: 48rem)'); 

    useEffect(() => {
        dispatch(subredditsThunk())
        const media960 = window.matchMedia( "(max-width: 960px)" );
        if (media960.matches) {
            setFa_2x('');
        } else {
            setFa_2x('fa-2x');
        }
    }, [dispatch, fa_2x]);

    console.log(subreddit);
    


    const buttonHandleClick = () => {
        setButton(!button)     
    }
    
    
    let buttonMenu;
    let buttonClip1;
    let buttonClip2;
    if (button) {
        buttonClip1 = <i className="fas fa-clipboard-list board-clip"></i>;
        buttonClip2 = <i className="fas fa-chevron-left board-clip-arrow"></i>;
        buttonMenu = ( // all will be linked remember when you do the api
            <div role="menu" className="div-menu">
                <input className="input-div-menu" type="text" placeholder="Filter REDUX for r/whatever subredit" />
                <ul className="ul-menu" role="menu">
                    {
                        subreddit.map(reddit => 
                                <Link to={reddit} className="all-links">
                                    <li className="li-menu" role="menuitem">{reddit}</li>
                                </Link>
                        )
                    }
                </ul>
            </div>
        )
    }  

    
    return (
        <header>
            <div className="home-nav-div">
                <Link to="/" className="home-nav-link all-links">
                    <i className="fab fa-reddit fa-3x"></i>
                    <p className="reddit">client</p>
                </Link>
            </div>
            
            <ButtonMenuDown 
                // button={button}
                buttonHandleClick={buttonHandleClick}
                buttonClip1={buttonClip1}
                buttonClip2={buttonClip2}
                buttonMenu={buttonMenu}
            />
            
            
            <SearchForm />
            <Nav fa_2x={fa_2x} />            
        </header>
    )
    
}

