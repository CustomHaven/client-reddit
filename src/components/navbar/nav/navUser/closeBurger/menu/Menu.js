import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AllReddits from '../../../../../aside/listOfAllReddit/allReddits/AllReddits';
import { selectListOfAll } from '../../../../../../feature/listOfAll/listOfAllSlice';
import { selectSearchQuery, querySearch, searchThunk } from '../../../../../../feature/search/searchSlice.js';

const Menu = (props) => {
    const { setMenu } = props;
    const allList = useSelector(selectListOfAll);
    const query = useSelector(selectSearchQuery);
    const dispatch = useDispatch();
    const history = useHistory();
    const [remove, setRemove] = useState(false);

    const menuRemover = () => {
        setRemove(true)
        setMenu(false)
    }

    const handleChange = (e) => {
        dispatch(querySearch(e.target.value));
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setMenu(false);
        setRemove(true);
        dispatch(searchThunk(query));
        history.push(`/search?query=${query}`)
        dispatch(querySearch(''));
    }

    return (
        <>
        {
            remove === false &&
            <ul className="small-menu-ul">
            <div style={{position: "absolute", top: "0"}}>
            <li className="li-form-menu-search">
                <form onSubmit={formSubmit} className="burger-form-menu" method="GET">
                    <div className="burger-menu-wrapper">
                    <i className="fas fa-search burger-search-icon"></i>
                    <input value={query} onChange={handleChange} className="burger-search-input" type="search" placeholder="Search" />
                    </div>               
                </form>
            </li>
            <li style={{width: "100%", height: "100%"}}>
            { 
                allList.map(list => 
                        <AllReddits
                            list={list}
                            articleClick={menuRemover}
                        />
                )
            }
            </li>
            </div>
        </ul>
        }
        </>
    )
}

export default Menu;