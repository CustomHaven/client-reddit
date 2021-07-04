import React from 'react'; // try useMemo  for the utc
// import { timeAgo } from '../../../../../util/mathWork.js';
import Utc from './Utc.js';
import moment from 'moment'; // regardless if i use moment or my own function I have problem with timeAgo maybe useMemo? we will see

const RepeatedReplies = (props) => {
    const { list, recursion, timeAgo } = props; 
  
    

    return (

        list.map((reply, index) =>
            <>

            {
            reply?.id?.length > 1 &&

            <div key={reply?.id} className="reply-div">
                <p className="reply-author">{reply?.author}</p>
                <p className="reply-text">{reply?.body}</p>
                <Utc 
                    reply={reply?.utc}
                    id={reply?.id}
                />
                
                {
                    typeof reply?.replies === "object" &&
                    <>
                    {recursion(reply?.replies, index, reply?.id)}

                    <RepeatedReplies 
                        list={reply?.replies?.data?.children.map(child => child.data)}
                        recursion={recursion}
                        timeAgo={timeAgo}
                    />
                    </>
                }
            </div>} </>
        )
    )
}

export default RepeatedReplies;