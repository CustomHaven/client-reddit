import React from 'react';
import { colorNum } from '../../../util/mathWork';


const HeaderImg = (props) => {

    const { idx, allList } = props;

    return (
        <div 
        className="header-img-wrapper"
        style={{backgroundColor: `rgba(${colorNum()}, ${colorNum()}, ${colorNum()}, 0.4)`}}>
        {
            idx !== -1 && allList[idx].headerImg !== null 
            ?
            <img 
                key={allList[idx].id} 
                src={allList[idx].headerImg} 
                alt="header-display" 
            />
            :
            <img 
                // key={allList[idx].id} 
                src="https://b.thumbs.redditmedia.com/hOn2BgW06eQdpNY-RvF3UGBtbG_CFbr4XkotMYLWhEc.png" 
                alt="header-display" 
            />
        }
        </div>
    )
}

export default HeaderImg;