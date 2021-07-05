import React from 'react';
import { ButtonMenu } from './buttonMenu/ButtonMenu.js';

export const ButtonMenuDown = (props) => {

    const { button, buttonHandleClick } = props;
   
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