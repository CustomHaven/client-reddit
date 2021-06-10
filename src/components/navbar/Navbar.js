import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ButtonMenuDown } from './buttonMenuDown/ButtonMenuDown.js'
import { SearchForm } from './searchForm/SearchForm.js';
import { Nav } from './nav/Nav.js'
// import { CloseBurger } from './closeBurger/CloseBurger'

export const Navbar = () => {
    
    const [button, setButton] = useState(false);

    // useEffect(() => {
    //     if (button === true) {
    //         document.getElementById('root').addEventListener('click', buttonMenuMethod)
    
    //         return () => {
                // window.removeEventListener('click', buttonMenuMethod)
    //         }
    //     }
    // }, [button]);

    // const buttonMenuMethod = () => {
    //     setButton(false);
    // }

    const [fa_2x, setFa_2x] = useState('fa-2x');

    useEffect(() => {
        const media960 = window.matchMedia( "(max-width: 960px)" );
        media960.addEventListener('change', media);
        // media960.addEventListener('load', media);
        return () => {
            media960.removeEventListener('change', media);
            // media960.removeEventListener('load', media);
        } // tried the 'load' on the event listener but nothing even with cleanup removeEVent or without still no
    }, [fa_2x]);

    const media = () => {
        const mq = window.matchMedia( "(max-width: 960px)" );
        if (mq.matches) {
            console.log('width below 960')
            setFa_2x('');
        } else {
            setFa_2x('fa-2x');
        }
    }
    


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

