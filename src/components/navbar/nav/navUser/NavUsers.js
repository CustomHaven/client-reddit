import React from 'react';
import { Link } from 'react-router-dom';
import {CloseBurger} from './closeBurger/CloseBurger.js';

export const NavUsers = (props) => {
    const {fa_2x} = props;
    return (
        <div className="user-div">
            <CloseBurger />
                
            <Link to="/username" className="all-links user-link-button"> 
            <button className="user-button">
                
                    <i className={`fab fa-reddit-square ${fa_2x} all-links`}></i>
                    <p className="user-name">User Name</p>
                    <i className="fas fa-chevron-down user-down-arrow"></i>
                
            </button>
            </Link>
        </div>
    )
}
