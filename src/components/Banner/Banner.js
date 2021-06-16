import React, { useState, useEffect } from 'react';
import './Banner.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectListOfAll, listOfAllThunk } from '../../feature/listOfAll/listOfAllSlice.js';
import HeaderImg from './headerImg/HeaderImg.js';
import BannerImg from './bannerImg/BannerImg.js';
import TitleImg from './titleImg/TitleImg.js';


const Banner = () => {

    const dispatch = useDispatch();
    const allList = useSelector(selectListOfAll);

    useEffect(() => {
        dispatch(listOfAllThunk())
    }, [allList, dispatch]);


    const location = window.location.href;

    const regex = /http(s)?:\/\/localhost:3000(\/dragon)?\//i;

    const regexResult = location.replace(regex, '');

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
                idx={index}
                allList={allList}
            />
        </section>
    )
}

export default Banner;