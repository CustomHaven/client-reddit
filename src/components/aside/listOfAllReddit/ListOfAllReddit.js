import React from 'react';
import AllReddits from './allReddits/AllReddits';

const ListOfAllReddit = (props) => {
    const { allList } = props;

    return (
        <aside className="list-all">
        <div id="aside-title">
        <h1 className="aside-title">More Subreddits</h1>
        </div>
        {
            allList.map((list, index) => 

                <AllReddits 
                    list={list}
                    index={index}
                />
            )
        }
        </aside>
    )
}

export default ListOfAllReddit;