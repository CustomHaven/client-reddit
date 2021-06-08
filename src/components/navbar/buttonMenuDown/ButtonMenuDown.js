import React from 'react';

export const ButtonMenuDown = (props) => {

    const { buttonHandleClick, buttonClip1, buttonClip2, buttonMenu } = props;

    return (
        <div className="button-div-down">
            <button className="button-nav-down" onClick={buttonHandleClick}>
                <p className="button-home">
                    <i className="fas fa-home fa-2x"></i>
                    <span className="home-span">Home</span>
                </p>
                {buttonClip1}
                {buttonClip2}
                <i className="fas fa-chevron-down down-arrow"></i>
                
            </button>
            {buttonMenu}
        </div>
    )
}