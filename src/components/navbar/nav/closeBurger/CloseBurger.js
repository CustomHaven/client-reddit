import React, { useState } from 'react';
import Menu from './menu/Menu';

const CloseBurger = (props) => {
    const { mediaMenu } = props;
    const [menu, setMenu] = useState(false);

    const handleClick = () => {
        setMenu(!menu);
    }

    const burger = <i onClick={handleClick} className="fas fa-bars fa-2x burger menu-button-hide"></i>;
    const smallMenuCloser = <i onClick={handleClick} className="far fa-times-circle fa-2x burger menu-button-hide"></i>;
    
    return (
        <>
        {   
            mediaMenu === false &&
            <>
            {menu ? smallMenuCloser : burger}
   
            {menu && 
            <Menu 
                setMenu={setMenu}
            />}
            </>
           
        }
        </>
    )
}

export default CloseBurger;