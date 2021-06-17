import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOfAllThunk, selectListOfAll } from '../../../../feature/listOfAll/listOfAllSlice.js';

export const ButtonMenu = () => {

    const allList = useSelector(selectListOfAll);
    // const dispatch = useDispatch();

    // useEffect(() => {
        // window.addEventListener('click', () => {
            // dispatch(allListsListThunk())
        // });

        // return () => {
            // window.removeEventListener('click', () => {
                // dispatch(allListsListThunk())
            // })
        // }

    // }, [dispatch]);


    return (
        <div role="menu" className="div-menu">
        <input className="input-div-menu" type="text" placeholder="Filter REDUX for r/whatever subredit" />
        <ul className="ul-menu" role="menu">
            {
                allList.map((reddit, index) => 
                        <Link to={`/dragon/${reddit.name}`} className="all-links" key={reddit.id}>
                            <li className="li-menu" role="menuitem">{reddit.prefix}</li>
                        </Link>
                )
            }
        </ul>
    </div>
    )
}