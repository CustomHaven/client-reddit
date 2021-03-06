import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseBurger from './closeBurger/CloseBurger.js';
import { FaRedditSquare } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { selectMenu, displayMenu } from '../../../feature/listOfAll/listOfAllSlice.js';

export const Nav = () => {
    const mediaMenu = useSelector(selectMenu);
    const dispatch = useDispatch();

    useEffect(() => {
        const media768 = window.matchMedia( "(max-width: 768px)" );
        
        if (media768.matches) {
            dispatch(displayMenu(false));
        } else {
            dispatch(displayMenu(true));
        }

        media768.addEventListener('change', () => {
            if (media768.matches) {
                dispatch(displayMenu(false));
            } else {
                dispatch(displayMenu(true));
            }
        })

        return () => {
            media768.removeEventListener('change', () => {
                if (media768.matches) {
                    dispatch(displayMenu(false));
                } else {
                    dispatch(displayMenu(true));
                }
            })
        }
    }, [dispatch, mediaMenu]);

    return (
        <nav className="navbar">  
        <div className="user-div">
            <CloseBurger 
                mediaMenu={mediaMenu}
            />       
            {
                mediaMenu === true ?
                <Button cursor="pointer" variant="none" className="user-button">
                    <FaRedditSquare className="square-logo" />
                    <p className="user-name">Welcome</p>
                
                </Button> : null
            }
        </div>
        </nav>
    )
}