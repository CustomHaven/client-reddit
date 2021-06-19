import React from 'react';

const TitleImg = (props) => {
    
    const { rgx, idx, allList } = props;

    return (
        <div className="title-section">

        <div className="icon-img">

        {
            idx !== -1 && allList[idx].iconImg !== null && allList[idx].iconImg.length > 0 
            ?
            <img 
                key={allList[idx].id}
                src={allList[idx].iconImg} 
                alt="icon-display" />
            :
            <img 
                src="https://b.thumbs.redditmedia.com/xDPX3Hq8IYJPpEdTsDGDJ_LZCnABwL13cg0DE78HU-w.png" 
                alt="temp" 
            />
        }

        </div>

        <h1>{idx !== -1 ? allList[idx].title 
        : rgx.length > 0 ? `${rgx.slice(0, 1).toUpperCase()}${rgx.slice(1, rgx.length)}` : 'Home'}</h1>

        <h1>{idx !== -1 ? allList[idx].prefix 
        : rgx.length > 0 ? `r/${rgx.slice(0, 1).toUpperCase()}${rgx.slice(1, rgx.length)}` : 'r/Home'}</h1>

        </div>
    )
}


export default TitleImg;
