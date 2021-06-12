import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { ButtonMenuDown } from './buttonMenuDown/ButtonMenuDown.js'
import { SearchForm } from './searchForm/SearchForm.js';
import { Nav } from './nav/Nav.js';
import { ButtonMenu } from './buttonMenuDown/buttonMenu/ButtonMenu.js';
import { useMediaQuery } from 'beautiful-react-hooks';

export const Navbar = () => {



    const [button, setButton] = useState(false);

    // useEffect(() => {
    //     if (button === true) {
    //         document.getElementById('root').addEventListener('click', buttonMenuMethod)
    
    //         return () => {
    //             window.removeEventListener('click', buttonMenuMethod)
    //         }
    //     }
    // }, [button]);

    // const buttonMenuMethod = () => {
    //     setButton(false);
    // }

    const [fa_2x, setFa_2x] = useState('fa-2x');



    useEffect(() => {

        const media960 = window.matchMedia( "(max-width: 960px)" );
        
        if (media960.matches) {
            setFa_2x('');
        } else {
            setFa_2x('fa-2x');
        }
    }, [fa_2x, button]);

    // console.log(subreddit);
    


    const buttonHandleClick = () => {
        setButton(!button)     
    }
    
    
    // let buttonMenu;
    // let buttonClip1;
    // let buttonClip2;
 

    
    return (
        <header>
            <div className="home-nav-div logo-div">
                <Link to="/" className="home-nav-link all-links">
                    <i className="fab fa-reddit fa-3x"></i>
                    <p className="reddit">client</p>
                </Link>
            </div>
            
            <ButtonMenuDown 
                button={button}
                buttonHandleClick={buttonHandleClick}
                // buttonClip1={buttonClip1}
                // buttonClip2={buttonClip2}
                // buttonMenu={buttonMenu}
            />
            
            
            <SearchForm />
            <Nav fa_2x={fa_2x} />            
        </header>
    )
    
}

