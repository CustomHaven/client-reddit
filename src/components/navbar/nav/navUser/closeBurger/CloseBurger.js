import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function CloseBurger() {
    const [menu, setMenu] = useState(false);
    const handleClick = () => {
        setMenu(!menu);
    }

    const burger = <i onClick={handleClick} className="fas fa-bars fa-2x burger menu-button-hide"></i>;
    const smallMenuCloser = <i onClick={handleClick} className="far fa-times-circle fa-2x burger menu-button-hide"></i>;
    
    
    const theMenu = (
        <ul className="small-menu-ul">
            <li className="li-form-menu-search">
                <form className="the-menu-search" method="GET">
                    <div className="search-icon-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input className="search-input" type="search" placeholder="Search" />
                    </div>               
                </form>
            </li>
            <Link to="/r/popular" className="">
                <li>                                
                    <i className="fas fa-fire fa-2x all-links"></i>
                    <p>All Popular Reddits  1</p>                           
                </li>
            </Link>
            <Link to="/r/all" className="">
                <li>                                                 
                    <i className="fas fa-globe fa-2x all-links"></i>
                    <p>All Global Reddits   2</p>                           
                </li>
            </Link>
            <Link to="/r/birdswitharms">
                <li>                                    
                    <i className="fas fa-dove fa-2x all-links"></i>
                    <p>Birds With Arms Reddits  3</p>                           
                </li>
            </Link>
            <Link to="/r/unstirredpaint">
                <li>                                    
                    <i className="fas fa-paint-brush fa-2x all-links"></i>
                    <p>Unstirred Paint Reddits  4</p>                           
                </li>
            </Link>
            <Link to="/r/chairsunderwater">
                <li>                                    
                    <i className="fas fa-chair fa-2x all-links"></i>
                    <p>Chairs Under Water Reddits  5</p>                           
                </li>
            </Link>
            <Link to="/r/boottoobig">
                <li>                                    
                    <i className="far fa-smile-wink fa-2x all-links"></i>
                    <p>Special Reddits  6</p>                           
                </li>
            </Link>
        </ul>
    )


    return (
        <>
        {menu ? smallMenuCloser : burger}
        {menu && theMenu}
        </>
    )
}