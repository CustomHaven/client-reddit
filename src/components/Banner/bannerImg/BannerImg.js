import React from 'react';
import randomNum from '../../../util/randomNumbers';


const BannerImg = (props) => {

    const { idx, allList } = props;


    return (
        <>
        {
            idx !== -1 && allList[idx].bannerImg.length > 0 
            ?   
            <div key={allList[idx].id} className="banner-img-wrapper">           
            <img src={allList[idx].bannerImg} alt="banner-img" />         
            </div> 
            : 
            <div 
                // key={allList[idx].id}
                className="no-img"
                style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}>
            </div>
        }
        </>
    )
}

export default BannerImg;
