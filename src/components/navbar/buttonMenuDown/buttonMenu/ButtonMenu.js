import React from 'react';
import { useSelector } from 'react-redux';
import { selectListOfAll } from '../../../../feature/listOfAll/listOfAllSlice.js';
import AllReddits from '../../../aside/listOfAllReddit/allReddits/AllReddits.js';

export const ButtonMenu = () => {

    const allList = useSelector(selectListOfAll);
    
    return (
        <div role="menu" className="div-menu">
            <input className="input-div-menu" type="text" placeholder="Filter REDUX for r/whatever subredit" />
            <ul className="ul-menu" role="menu">
                {
                    allList.map((list) =>
                        <AllReddits
                            list={list}
                        />
                    )
                }
            </ul>
        </div>
    )
}