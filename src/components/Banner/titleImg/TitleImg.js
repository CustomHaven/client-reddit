import React from 'react';
import { FaReddit } from "react-icons/fa";

const TitleImg = (props) => {
    
    const { rgx, idx, allList, rgxSearch } = props;

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
                <FaReddit className="title-fa" />
            }
            </div>

            <div className="header-title">
                <h1>{
                    rgxSearch.length > 0 ? null :
                    idx !== -1 ? allList[idx].title 
                    : rgx.length > 0 ? `${rgx.slice(0, 1).toUpperCase()}${rgx.slice(1, rgx.length)}` : 'Home'
                    }
                </h1>
            </div>
            <div className="header-title">
                <h1>{
                    rgxSearch.length > 0 
                    ? `${rgxSearch.slice(0, 1).toUpperCase()}${rgxSearch.slice(1, rgxSearch.length)}` :
                    idx !== -1 ? allList[idx].prefix 
                    : rgx.length > 0 ? `r/${rgx.slice(0, 1).toUpperCase()}${rgx.slice(1, rgx.length)}` : 'r/Home'}
                </h1>
            </div>
            
        </div>
    )
}

export default TitleImg;