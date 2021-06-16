import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectListOfAll } from '../../../feature/listOfAll/listOfAllSlice';
import randomNum from '../../../util/randomNumbers';


const HeaderImg = (props) => {

    // const allList = useSelector(selectListOfAll)

    const { idx, allList } = props;
    // const [list, setList] = useState([]);

    // console.log('headerIMG');
    // console.log(allList);
    // console.log('headerIMG');
    // const index = allList.findIndex(child => child.name === regex);
    // useEffect(() => {
        // setList(allList);
    // }, [allList, list])

    return (
        <div 
        className="header-img-wrapper"
        style={{backgroundColor: `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.4)`}}>
        {
            idx !== -1 && allList[idx].headerImg !== null 
            ?
            <img src={allList[idx].headerImg} alt="header-display" />
            :
            <img src="https://b.thumbs.redditmedia.com/hOn2BgW06eQdpNY-RvF3UGBtbG_CFbr4XkotMYLWhEc.png" alt="header-display" />
        }
        </div>
    )
}

export default HeaderImg;