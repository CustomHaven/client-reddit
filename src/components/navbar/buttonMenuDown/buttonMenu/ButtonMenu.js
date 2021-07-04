import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectListOfAll } from '../../../../feature/listOfAll/listOfAllSlice.js';
import AllReddits from '../../../aside/listOfAllReddit/allReddits/AllReddits.js';
import { selectSearchTerm, searchInput, clearSearch, buttonToggle } from '../../../../feature/search/searchSlice.js';

export const ButtonMenu = () => {

    const allList = useSelector(selectListOfAll);
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const inputChange = (e) => {
        dispatch(searchInput(e.target.value))
    }

    const resetInput = () => {
        dispatch(clearSearch(''));
        dispatch(buttonToggle(false))
    }

    let regex = new RegExp(searchTerm, "gi"); // g flag necessary? oh well leave it because it works!!!
    const filteredList = searchTerm.length > 0 && allList.filter(list => list.name.match(regex))

    return (
        <div role="menu" className="div-menu">
            <input value={searchTerm} onChange={inputChange} className="input-div-menu" type="search" placeholder="Search" />
            <ul className="ul-menu" role="menu">
                {
                    searchTerm.length > 0 && filteredList.map(list => 
                        <AllReddits 
                            list={list}
                            articleClick={resetInput}
                        />
                    )
                }
            </ul>
        </div>
    )
}