import React from 'react';
import { ButtonMenu } from './buttonMenu/ButtonMenu.js';

export const ButtonMenuDown = (props) => {

    const { button, buttonHandleClick } = props;

    // let buttonClip1;
    // let buttonClip2;
    // if (button) {
    //     buttonClip1 = <i className="fas fa-clipboard-list board-clip"></i>;
    //     buttonClip2 = <i className="fas fa-chevron-left board-clip-arrow"></i>;
        // buttonMenu = ( // all will be linked remember when you do the api

        // )
    

    return (
        <div className="button-div-down">
            <button className="button-nav-down" onClick={buttonHandleClick}>
                <p className="button-home">
                    <i className="fas fa-home fa-2x"></i>
                    <span className="home-span">Home</span>
                </p>
                {
                    button && (
                    <>
                        <i className="fas fa-clipboard-list board-clip"></i>
                        <i className="fas fa-chevron-left board-clip-arrow"></i>
                    </>
                    )
                }
                <i className="fas fa-chevron-down down-arrow"></i>
                
            </button>
            {button && <ButtonMenu />}
        </div>
    )
}