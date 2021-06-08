import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './nav/Nav.js'
// import { CloseBurger } from './closeBurger/CloseBurger'

export const Navbar = () => {

    const [divMenu, setDivMenu] =  useState(false);
    
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
    const [fa_3x, setFa_3x] = useState('fa-3x');

    useEffect(() => {
        const media960 = window.matchMedia( "(max-width: 960px)" );
        media960.addEventListener('change', media)
        return () => {
            media960.removeEventListener('change', media)
        }
    }, [fa_2x]);

    const media = () => {
        const mq = window.matchMedia( "(max-width: 960px)" );
        if (mq.matches) {
            setFa_3x('fa-2x');
            setFa_2x('');
        } else {
            setFa_3x('fa-3x');
            setFa_2x('fa-2x');
        }
    }
    
    


    const buttonHandleClick = () => {
        console.log(button)
        setButton(!button)
        console.log(button)        
    }

    const reddit = async () => {
        try {
            const response = await fetch('https://www.reddit.com/r/boottoobig.json', { method: 'GET'});
            const jsonResponse = await response.json();
            // console.log(jsonResponse)
            return jsonResponse;
        } catch(err) {
            console.log(err)
        }
    }
    console.log(reddit());
    
    
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
                    <Link to="/r/new" className="all-links">
                        <li className="li-menu" role="menuitem">New</li>
                    </Link>
                    <Link to="/r/open" className="all-links">
                        <li className="li-menu" role="menuitem">Open</li>
                    </Link>
                    <Link to="/r/save" className="all-links">
                        <li className="li-menu" role="menuitem">Save</li>
                    </Link>
                    <Link to="/r/close" className="all-links">
                        <li className="li-menu" role="menuitem">Close</li>
                    </Link>
                    <Link to="/r/dontforget" className="all-links">
                        <li className="li-menu" role="menuitem">DONT FORGET TO SET UP TO THE API LOCATION</li>
                    </Link>
                </ul>
            </div>
        )
    }  

    
    return (
        <header>
            <div className="home-nav-div">
                <Link to="/" className="home-nav-link all-links">
                    <i className={`fab fa-reddit ${fa_3x}`}></i>
                    <p className="reddit">redd<span>i</span>t</p>
                </Link>
            </div>
            
                <div className="button-div-down">
                    <button className="button-nav-down" onClick={buttonHandleClick}>
                        <p className="button-home">
                            <i className="fas fa-home fa-2x"></i>
                            <span className="home-span">Home</span>
                        </p>
                        {buttonClip1}
                        {buttonClip2}
                        <i className="fas fa-chevron-down down-arrow"></i>
                        
                    </button>
                    {buttonMenu}
                </div>
            
            
            
            
            <form className="search-form-wrapper" method="GET">
                <div className="search-icon-wrapper">
                  <i className="fas fa-search search-icon"></i>
                  <input className="search-input" type="search" placeholder="Search" />
                </div>               
            </form>
            <Nav fa_2x={fa_2x} />
            
        </header>
    )
    
}

