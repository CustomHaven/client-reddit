import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { TiMessage } from 'react-icons/ti';
import { selectRepliesList, repeatReplies, selectRepeatReplies } from '../../../../../feature/post/postSlice.js'
import { timeAgo } from '../../../../../util/mathWork.js';

const Reply = (props) => {
    const { idx, repliesClick, allReplies } = props;
    const [repeating, setRepeating] = useState(null);
    const [replyRepeat, setReplyRepeat] = useState(null);
    const theRepeat = useSelector(selectRepeatReplies);
    const dispatch = useDispatch();

    const recursionReplies = (replies, count = undefined, idx = undefined) => {
        if (Object.values(replies).length === 1 || Object.values(replies).length === 0) {
            console.log('Nothing more to loop');
            return;
        }

        console.log(count + " count")
        console.log(idx + " idx")

        // if (replies['data']['children'] instanceof Array) {
        //     console.log("I am an array!")
        // } else {
        //     console.log("not an array I am an Object")
        // }
        console.log('initial reply')
        console.log(Object.values(replies).length)
        console.log(replies)
        // // console.log(replies.data) 



        // // console.log(replies.data.children) 
        // // console.log(Object.values(replies))
        // // console.log(Object.values(replies).length) // inital reply has a length of 2 so we are safe
        console.log('initial reply')
        // // console.log(replies)
        // // console.log(replies.data)
        // console.log('initial reply')



        // console.log(replies)
        // console.log(count)/

        if (idx !== undefined) {
            if (replyRepeat === idx) {
                console.log("I have idx but turn me off")
                setReplyRepeat(null);
            } else {

                console.log("I have idx turn me on")
                setReplyRepeat(idx);
                dispatch(repeatReplies(replies.data.children.map(child => child.data)))
            }
        } else {
            if (repeating === count) {
                console.log("Im parent count but turn me off")
                setRepeating(null)
            } else {
                console.log("Im parent count but turn me on")
                setRepeating(count)
                dispatch(repeatReplies(replies.data.children.map(child => child.data)));
            }
        }

        // theRepeat.map((repi, idx) => 
        // // console.log(repi[idx])

        //         <div className="container-nested-replies">
        //         <p className="repeat-reply-author">{repi[idx].author}</p>
        //         <p className="repeat-reply-text">{repi[idx].body}</p>
        //         <p className="timeStamp">{timeAgo(repi[idx].utc * 1000)}</p>

        //         {
        //                 typeof repi.replies === 'object' &&

        //                 <TiMessage onClick={(e) => recursionReplies(repi[idx].replies, idx)} className="reddit-symbol post-symbol"/>

        //         }
        //         </div>
        // )



        // console.log(theRepeat)

        // making the function recursion loop here below
        // if (theRepeat.constructor === Array) {

        // }
        const repeated = theRepeat.find(rep => rep.replies);
        const convert = Object.assign({}, repeated);
        return recursionReplies(convert)
    }

    useEffect(() => {

    }, [dispatch])

    return (
        <>

            {
                repliesClick === idx &&
                <div className="reply-container">
                    {
                        allReplies.length > 0 && allReplies.map((reply, count) =>

                            <div className="reply-div" key={reply.id}>
                                <p className="relpy-author">{reply.author}</p>
                                <p className="reply-text">{reply.body}</p>
                                <p className="timeStamp">{timeAgo(reply.utc * 1000)}</p>

                                {
                                    typeof reply.replies === 'object' &&

                                    <TiMessage onClick={(e) => recursionReplies(reply.replies, count)} className="reddit-symbol post-symbol" />

                                }
                                {
                                    repeating === count &&
                                    theRepeat.map((repi, idx) =>
                                        // console.log(repi[idx])

                                        <div key={repi.id} className="container-nested-replies">
                                            <p className="repeat-reply-author">{repi.author}</p>
                                            <p className="repeat-reply-text">{repi.body}</p>
                                            <p className="timeStamp">{timeAgo(repi.utc * 1000)}</p>

                                            {
                                                typeof repi.replies === 'object' &&

                                                <TiMessage onClick={(e) => recursionReplies(repi.replies, count, idx)} className="reddit-symbol post-symbol" />

                                            }
                                        </div>
                                    )
                                }



                            </div>

                        )
                    }
                </div>
            }
        </>
    )
}

export default Reply;

function Helper() {
    return (
        <div>

        </div>
    )
}


// let arr = [
//     {
//       id:"h2j3x33",
//       author:"Zindril",
//       body:"Glad to help. Hope it helps you clear even faster next reset!",
//       permalink:"/r/Genshin_Impact/comments/o4t6x5/i_finally_did_it_spiral_abyss_123/h2j3x33/",
//       utc:1624278978,
//       replies:""
//     },
//     {
//       id:"33",
//       author:"highperson",
//       body:"Im a the best!",
//       permalink:"/r/thebest/",
//       utc: 054,
//       replies: ""
//     },
//     {
//       id:"43",
//       author:"charizard",
//       body:"fire burn",
//       permalink:"/r/dragon/",
//       utc:342342,
//       replies: {id: 324, author: "mohamed", body: "handsome", permalink: "owner.com", utc: 1, replies: ""}
//     }
// ]
// for practise trying to do the recursion array