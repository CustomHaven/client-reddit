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
    const [divs, setDivs] = useState(null); // creating the JSX from the mapping done inside the recursive function
    const theRepeat = useSelector(selectRepeatReplies); // grabbing the redux
    const dispatch = useDispatch();

    const recursionReplies = (replies, secondReplies = undefined, count = undefined, idx = undefined, reply, repi) => {
        /* If recursion is no more the reply.replies inside the JSX is "" and certain time its value is 1
         we making this flag to break the loop */
        if (Object.values(replies).length === 1 || Object.values(replies).length === 0) {
            console.log('Nothing more to loop');
            return;
        }

        /* looking to see if I have the data I want coming into the function with all of those console.logs
        some of them I know I dont have value for them in the beginning so I set them to undefined */
        console.log("work");
        console.log(replies); // coming from the first map in JSX allReplies.map(reply => reply.replies) in the return
        console.log("work");
        console.log("second replies");
        console.log(secondReplies); // coming from the second map in JSX theRepeat[0].map(repi => repi.replies) 
        console.log("second replies"); // basically inside this function down below where I am trying to trigger the recursion
        console.log(count + " count"); // coming from the first map in JSX allReplies.map(reply => reply.count) its indexes
        console.log(idx + " idx"); // coming from the second map in JSX theRepeat[0].map(repi => repi.idx) its indexes

        console.log("reply 1st array");
        console.log(reply); // the array from first map --- basically these two arent really needed --- anyways
        console.log("reply 1st array");
        console.log("repi 2nd array");
        console.log(repi); // array from second map --- basically these two arent really needed --- anyways
        console.log("repi 2nd array");



        console.log('initial reply')
        console.log(Object.values(replies).length) // more checking to see of the length is is above 1
        console.log(replies) // if it is then we go forward
        
        console.log('initial reply')

        /// sending the inital data to redux
        if (secondReplies !== null) { // if secondReplies is not null basically the recursion send its object replies.reply in we do this condition
            if (replyRepeat === idx) {
                console.log("I have idx but turn me off") // trying to turn off the nested div if it is pressed
                setReplyRepeat(null);
            } else {
                console.log(secondReplies); // had some errors earlier but I managed to correct it because children could not me be mapped over now that is corrected
                console.log("I have idx turn me on")
                console.log(secondReplies);
                console.log("I have idx turn me on")
                setReplyRepeat(idx); // if it is pressed then show its content
                dispatch(repeatReplies(secondReplies.data.children.map(child => child.data))) // dispatching the action to redux
            }
        } else {
            if (repeating === count) { // child secondReplies is null we havent gone down to it then we set the parent
                console.log("Im parent count but turn me off")
                setRepeating(null) // if it is open then toggle it off
            } else {
                console.log("Im parent count but turn me on")
                setRepeating(count) // toggle on
                dispatch(repeatReplies(replies.data.children.map(child => child.data)));
            }
        }

        console.log(repeating + " repeating like the bool for the parent div") // just checking to see what values they are
        console.log(replyRepeat + " replyRepeat like the bool for the child div") // just checking to see what values they are

        if (repeating === count) { // In redux the data comes back as [ [ {}, {}, {} ] ] thats why I have theRepeat[0]
                setDivs(theRepeat[0].map((repi, idx, repis) =>

                    <div key={repi.id} className="container-nested-replies">
                        <p className="repeat-reply-author">{repi?.author}</p>
                        <p className="repeat-reply-text">{repi?.body}</p>
                        <p className="timeStamp">{timeAgo(repi?.utc * 1000)}</p>

                        {
                            typeof repi?.replies === 'object' &&
                            // trying to make the recursion Function here the function is calling itself
                            <TiMessage onClick={(e) => recursionReplies(replies, repi?.replies, count, idx, reply, repis)} className="reddit-symbol post-symbol" />

                        }
                    </div>
                ))
        }
        
        ///// tried recursion with this below earlier but deleted this.
        // const repeated = theRepeat.find(rep => rep.replies);
        // const convert = Object.assign({}, repeated);
        // return recursionReplies(convert)
    }

    useEffect(() => {

    }, [dispatch])

    return (
        <>

            {
                repliesClick === idx &&
                <div className="reply-container">
                    {   // The parent map which it all starts from when a click happens here we try run the recursionfunction
                        allReplies.length > 0 && allReplies.map((reply, count) =>

                            <div className="reply-div" key={reply.id}>
                                <p className="relpy-author">{reply.author}</p>
                                <p className="reply-text">{reply.body}</p>
                                <p className="timeStamp">{timeAgo(reply.utc * 1000)}</p>

                                {
                                    typeof reply.replies === 'object' &&
                                    // first stage of the function when it is pressed
                                    <TiMessage onClick={(e) => recursionReplies(reply.replies, null, count, null, reply, null)} className="reddit-symbol post-symbol" />

                                }
                                {/* 
                                below I am trying to deliver the output trying to get the divs to be nested comments 
                                just like they have it on reddit 
                                I manage to only get it down to that second replyRepeat === idx && divs
                                afterwards it doesnt carry on recurring
                                */}
                                {repeating === count && divs}
                                {replyRepeat === idx && divs} 
                                

                            </div>

                        )
                    }
                </div>
            }
        </>
    )
}

export default Reply;