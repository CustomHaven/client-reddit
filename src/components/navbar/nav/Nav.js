import React from 'react';
import { Link } from 'react-router-dom';
import { NavUsers } from './navUser/NavUsers.js'

export const Nav = (props) => {
    const {fa_2x} = props;

    return (
        <nav className="navbar">              
            <NavUsers fa_2x={fa_2x} />      
        </nav>
    )
}