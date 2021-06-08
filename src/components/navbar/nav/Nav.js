import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavUsers } from './navUser/NavUsers.js'

export const Nav = (props) => {
    const {fa_2x} = props;

    return (
        <nav className="navbar">
            <ul className="navbar-ul-first navbar-ul" >
                <li className="navbar-li" >
                    <Link to="/r/popular" className="">
                        <i className={`fas fa-fire ${fa_2x} all-links`}></i>
                    </Link>
                </li>
                <li className="navbar-li" >
                    <Link to="/r/all" className="">
                        <i className={`fas fa-globe ${fa_2x} all-links`}></i>
                    </Link>
                </li>
            </ul>
            <ul className="navbar-ul-second navbar-ul">
                <li className="navbar-li">
                    <Link to="/r/birdswitharms">
                        <i className={`fas fa-dove ${fa_2x} all-links`}></i>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to="/r/unstirredpaint">
                        <i className={`fas fa-paint-brush ${fa_2x} all-links`}></i>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to="/r/chairsunderwater">
                    <i className={`fas fa-chair ${fa_2x} all-links`}></i>
                    </Link>
                </li>
                <li className="navbar-li">
                    <Link to="/r/boottoobig">
                        <i className={`far fa-smile-wink ${fa_2x} all-links`}></i>
                    </Link>
                </li>
            </ul>              
            <NavUsers fa_2x={fa_2x} />      
        </nav>
    )
}