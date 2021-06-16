import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectListOfAll } from '../../../feature/listOfAll/listOfAllSlice';
import randomNum from '../../../util/randomNumbers';


const BannerImg = (props) => {

    // const allList = useSelector(selectListOfAll)

    // useEffect(() => {

    // }, [allList])


    const { idx, allList } = props;
    // const [list, setList] = useState([]);

    console.log('bannerIMG');
    console.log(allList);
    console.log('bannerIMG');

    // const location = window.location.href;

    // const regex = /http(s)?:\/\/localhost:3000(\/dragon)?\//i;

    // const regexResult = location.replace(regex, '');

    // const index = allList.findIndex(child => child.name === regexResult);

    // useEffect(() => {
        // setList(allList);
    // }, [allList, list]);

    console.log(idx)

    return (
        <>
        {
            idx !== -1 && allList[idx].bannerImg.length > 0 
            ?   
            <div className="banner-img-wrapper">           
            <img src={allList[idx].bannerImg} alt="banner-img" />         
            </div> 
            : 
            <div 
                className="no-img"
                style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}>
            </div>
        }
        </>
    )
}

export default BannerImg;
