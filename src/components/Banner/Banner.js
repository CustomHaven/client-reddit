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
    let locationPath = useLocation()
    console.log(locationPath)  


    useEffect(() => {
        dispatch(listOfAllThunk());
    }, [dispatch]);

    const location = locationPath.pathname;

    // const location = window.location.href;

    console.log(location + " the loc")

    // const regex = /http(s)?:\/\/localhost:3000(\/dragon)?\//i;
    const regex = /(\/dragon)?\//i;

    const regexResult = location.replace(regex, '');

    console.log(regexResult);

    const index = allList.findIndex(child => child.name === regexResult)

    return (
        <section className="banner-section">
            <HeaderImg 
                idx={index}
                allList={allList}
            />            
            {/*  */}
            <BannerImg 
                idx={index}
                allList={allList}
            />
            {/*  */}
            <TitleImg 
                rgx={regexResult}
                idx={index}
                allList={allList}
            />
        </section>
    )
}

export default Banner;