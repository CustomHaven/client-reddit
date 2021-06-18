import React from 'react';
import randomNum from '../../../util/randomNumbers';


const HeaderImg = (props) => {

    const { idx, allList } = props;

    return (
        <div 
        className="header-img-wrapper"
        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}>
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