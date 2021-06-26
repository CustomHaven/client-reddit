import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import "./Reply.css";
import { useSelector, useDispatch } from 'react-redux';
import { TiMessage } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { 
    repeatReplies,
    selectRepeatReplies,
    idCollector,
    selectIdCollection,
    idDeleter,
    selectParentCount,
    selectChildCount,
    parentAdd,
    parentDelete,
    childAdd,
    childDelete,
    clearAllReplies,
    deleteRepeatReplies
} from '../../../../../feature/post/postSlice.js'
import { timeAgo } from '../../../../../util/mathWork.js';

const Reply = (props) => {
    const { idx, repliesClick, allReplies } = props;
    // const [acknowledge, setAcknowledge] = useState(["ini"]);
    const theRepeat = useSelector(selectRepeatReplies); // grabbing the redux
    const theCollector = useSelector(selectIdCollection);
    const parentCount = useSelector(selectParentCount);
    const childCount = useSelector(selectChildCount);
    const memoryDiv = useRef(null);
    const prevMemory = useRef();
    const [grab, setGrab] = useState();

    // console.log("top level all replies")
    // console.log(allReplies)
    // console.log("top level all replies")

    const dispatch = useDispatch();
    // let emptyArray = '';

    useEffect(() => {
        // prevMemory.current = memoryDiv.current
    }, [dispatch, allReplies, theRepeat, parentCount, childCount, memoryDiv, theCollector])

    const recursionReplies = (
        replies, 
        secondReplies = undefined, 
        count = undefined, 
        idx = undefined, 
        parentId = undefined,
        childId = undefined
    ) => {

        if (replies === undefined || replies === null) {
            replies = ["hi", "damn", "you"]
        } else if (Object.values(replies).length === 1 || Object.values(replies).length === 0) {

            return;
        }

        if (count === undefined) {
            // console.log("parent count is undefined")
            count = parentCount;
        }
        if (idx === undefined) {
            // console.log("child count is undefined")
            idx = childCount;
        }
        if (parentId === undefined) {
            // console.log("parent ID is undefined")
            // console.log(parentId)
            parentId = theCollector.length[theCollector.length - 1]
            // console.log(parentId)
            // console.log("parent ID is undefined")
        }
        if (childId === undefined) {
            // console.log("child ID is undefined")
            // console.log(childId)
            childId = theCollector.length[theCollector.length - 1]
            // console.log(childId)
            // console.log("child ID is undefined")
        }


        if (secondReplies !== null && secondReplies !== undefined) { 
            if (childCount === idx) {
                console.log("Im second idx but turn me off this is for deleting")
                console.log(childId)
                console.log("we are in second deleting")
                // dispatch(childDelete(null))
                dispatch(idDeleter(childId));
                dispatch(idDeleter(parentId));
            } else {
                // setAcknowledge([...acknowledge, secondReplies.data.children])
                console.log("Im second idx but turn me on this is for adding")
                dispatch(childAdd(idx));                
                dispatch(idCollector(childId))
                dispatch(idCollector(parentId))
                // delete old secondReplies
                // dispatch(deleteRepeatReplies(idx))
                dispatch(repeatReplies(secondReplies.data.children.map(child => child.data)))
                
            }
        } else {
            if (parentCount === count) { 
                console.log("Im parent count but turn me off this is for deleting")
                console.log(parentId)
                console.log("we are in the deleting parent")
                dispatch(clearAllReplies([]));
                // dispatch(parentDelete(null))
                dispatch(idDeleter(parentId));
                dispatch(idDeleter(childId));
            } else {
                console.log("Im parent count but turn me on this is for adding")
                // toggle on
                dispatch(parentAdd(count))
                dispatch(idCollector(childId))
                dispatch(idCollector(parentId))
                // delete old replies
                // dispatch(deleteRepeatReplies(count))                
                dispatch(repeatReplies(replies?.data?.children?.map(child => child.data)));
            }
        }

    }
    console.log(parentCount)

    useLayoutEffect(() => {
        if (memoryDiv.current !== null) {
            console.log("we will display none")
            memoryDiv.current.style.display = "none"
        }
    }, [memoryDiv])

    const test = (memoryDiv) => {
        return memoryDiv.current.style.display = "none"
    }
    const helperFunction = (repi, idx, parentId) => {

            
        return (
             // If not in the id colldector array then give me new JSX
            <>
            {  
                
                
            <div ref={memoryDiv} key={repi?.id} className="container-nested-replies reply-div">
                <p className="repeat-reply-author reply-author">{repi?.author}</p>
                <p className="repeat-reply-text reply-text">{repi?.body}</p>
                <p className="utc-time">{timeAgo(repi?.utc * 1000)}</p>

                {
                    typeof repi?.replies === 'object' &&
                    // trying to make the recursion Function here the function is calling itself
                    <TiMessage 
                        onClick={(e) => recursionReplies(null, repi?.replies, null, idx, parentId, repi?.id)} 
                        className="reddit-symbol reply-symbol post-symbol" />
                    
                }
            </div>
            }
            
            </> 
            
        )
    }



    return (
        <>

            {
                repliesClick === idx &&
                
                <div className="reply-container">
                    {   
                        allReplies.length > 0 && allReplies?.map((reply, count, arr) =>
                         <>
                        {//!theCollector.includes(reply?.id) &&

                            <div className="reply-div" key={reply?.id}>
                                <p className="reply-author">{reply?.author}</p>
                                <p className="reply-text">{reply?.body}</p>
                                <p className="utc-time">{timeAgo(reply?.utc * 1000)}</p>

                                {
                                    typeof reply?.replies === 'object' &&
                                    // first stage of the function when it is pressed
                                    <TiMessage 
                                        onClick={(e) => recursionReplies(
                                            reply?.replies,
                                            null, 
                                            count, 
                                            null, 
                                            reply?.id,
                                            null
                                        )}
                                        className="reddit-symbol reply-symbol post-symbol" />

                                }
                                
                                {
                                    parentCount === count &&
                                    theRepeat.map((repi, idx) => 
                                        
                                    <> {(helperFunction(repi, idx, reply.id))}
                                    {!theCollector.includes(reply?.id) && !theCollector.includes(repi?.id) ?
                                    (childCount === idx && 
                                    (helperFunction(repi, idx, reply.id)))
                                    : null}
 
                                    
                                    
                                    </>
                                    )
                                
                              
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