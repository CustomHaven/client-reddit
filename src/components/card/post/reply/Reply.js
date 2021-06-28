import React from 'react';
import "./Reply.css";
import { useSelector, useDispatch } from 'react-redux';
import { 
    repeatReplies,
    idCollector,
    selectIdCollection,
    countAdd,
    indexCount,
} from '../../../../feature/post/postSlice.js';
import { timeAgo } from '../../../../util/mathWork.js';
import RepeatedReplies from './repeatedReplies/RepeatedReplies.js';

const Reply = (props) => {
    const { idx, repliesClick, allReplies } = props;
    const theCollector = useSelector(selectIdCollection);
    const dispatch = useDispatch();

    const recursionReplies = (replies, index, id) => {

        if (Object.values(replies).length === 1 || Object.values(replies).length === 0 || replies === "") {
            return;
        }

        if (!theCollector.includes(id)) {
            dispatch(idCollector(id));
            dispatch(indexCount(1));
            dispatch(repeatReplies(replies.data?.children?.map(child => child.data)));
            dispatch(countAdd(index));
        }
    }
    
    return (
        <>

            {
                repliesClick === idx &&
                
                <div className="reply-container">
                    {   
                        allReplies.length > 0 && allReplies?.map((reply, index) =>
                         <>
                        {!theCollector.includes(reply?.id) &&
                            
                            <div key={reply?.id} className="reply-div">
                                <p className="reply-author">{reply?.author}</p>
                                <p className="reply-text">{reply?.body}</p>
                                <p className="utc-time">{timeAgo(reply?.utc * 1000)}</p>

                                {
                                    typeof reply?.replies === "object" &&
                                    <>

                                    <RepeatedReplies 
                                        list={reply?.replies?.data?.children.map(child => child.data)}
                                        recursion={recursionReplies}
                                        timeAgo={timeAgo}
                                    />
                                    
                                    </>
                                }
                                
                           </div> } </>
                        )
                    }
                     
                </div>
            }
        </>
    )
}

export default Reply;