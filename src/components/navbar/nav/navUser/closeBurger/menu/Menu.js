import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AllReddits from '../../../../../aside/listOfAllReddit/allReddits/AllReddits';
import { selectListOfAll } from '../../../../../../feature/listOfAll/listOfAllSlice';

const Menu = (props) => {
    const {setMenu} = props;
    const allList = useSelector(selectListOfAll);
    const [remove, setRemove] = useState(false);

    const menuRemover = () => {
        setRemove(true)
        setMenu(false)
    }

    return (
        <>
        {
            remove === false &&
            <ul className="small-menu-ul">
            <div style={{position: "absolute", top: "0"}}>
            <li className="li-form-menu-search">
                <form className="the-menu-search" method="GET">
                    <div className="search-icon-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input className="search-input" type="search" placeholder="Search" />
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