import './Banner.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectListOfAll, listOfAllThunk } from '../../feature/listOfAll/listOfAllSlice.js';
import HeaderImg from './headerImg/HeaderImg.js';
import BannerImg from './bannerImg/BannerImg.js';
import TitleImg from './titleImg/TitleImg.js';

const Banner = () => {

    const dispatch = useDispatch();
    const allList = useSelector(selectListOfAll);
    const location = useLocation()
    

    useEffect(() => {
        dispatch(listOfAllThunk());
    }, [dispatch]);

    const locationPath = location.pathname;
    const locationSearch = location.search;
    const regex = /(\/dragon)?\//i;
    const regexSearch = /\?query=/i;
    const searchResult = locationSearch.replace(regexSearch, '');
    const regexResult = locationPath.replace(regex, '');
    const index = allList.findIndex(child => child.name === regexResult)

    return (
        <section className="banner-section">
            <HeaderImg 
                idx={index}
                allList={allList}
            />            

            <BannerImg 
                idx={index}
                allList={allList}
            />

            <TitleImg 
                rgx={regexResult}
                rgxSearch={searchResult}
                idx={index}
                allList={allList}
            />
        </section>
    )
}

export default Banner;