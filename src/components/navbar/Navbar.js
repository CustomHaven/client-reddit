import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { FaReddit } from "react-icons/fa";
import { ButtonMenuDown } from './buttonMenuDown/ButtonMenuDown.js'
import { SearchForm } from './searchForm/SearchForm.js';
import { Nav } from './nav/Nav.js';
import { buttonToggle, selectButtonMenu } from '../../feature/search/searchSlice.js';

export const Navbar = () => {
 
    const button = useSelector(selectButtonMenu);
    const dispatch = useDispatch();
    const [main, setMain] = useState(document.getElementsByClassName('the-flex-container'));
    const [banner, setBanner] = useState(document.getElementsByClassName('banner-img-wrapper'));
    const [title, setTitle] = useState(document.getElementsByClassName('title-section'));

    useEffect(() => {
        if (main !== null || main !== undefined) {
            main[0].addEventListener('click', toggleHomeMenu);
        }
        return () => {
            if (main !== null || main !== undefined) {
                main[0].removeEventListener('click', toggleHomeMenu)
            }
        }
    })

    useEffect(() => {
        if (banner !== null || banner !== undefined) {
            banner[0].addEventListener('click', toggleHomeMenu);
        }
        return () => {
            if (banner !== null || banner !== undefined) {
                banner[0].removeEventListener('click', toggleHomeMenu)
            }
        }
    })

    useEffect(() => {
        if (title !== null || title !== undefined) {
            title[0].addEventListener('click', toggleHomeMenu);
        }
        return () => {
            if (title !== null || title !== undefined) {
                title[0].removeEventListener('click', toggleHomeMenu);
            }
        }
    })

    const toggleHomeMenu = () => {
        dispatch(buttonToggle(false))
    }

    const buttonHandleClick = () => {
        if (button === true) {
            dispatch(buttonToggle(false));
        } else {
            dispatch(buttonToggle(true));
        }
    }

    return (
        <header>
            <div className="home-nav-div logo-div">
                <Link to="/" className="home-nav-link all-links">
                    <FaReddit className="square-logo" />
                    <p className="reddit">Reddit</p>
                </Link>
            </div>
            
            <ButtonMenuDown 
                button={button}
                buttonHandleClick={buttonHandleClick}
            />
           
            <SearchForm />
            <Nav /> {/*     delete the NAV component and replace with NavUsers because it is empty now       */}
        </header>
    )   
}