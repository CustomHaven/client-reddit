import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Box, SkeletonCircle, SkeletonText, Flex } from "@chakra-ui/react";
import { TiMessage, } from "react-icons/ti";
import { selectPostLoading, selectRepliesList } from '../../../../feature/post/postSlice.js';
import Reply from './reply/Reply.js';
import { timeAgo } from '../../../../util/mathWork.js';

const Post = (props) => {
    const { divPress, allPost, index, repliesClick, replyHandler } = props;

    const loading = useSelector(selectPostLoading)
    const allReplies = useSelector(selectRepliesList);

    return (
        <>
            { // THEN AFTER THAT AS A RESULT DISPLAY THE BIT BELOW HERE
            divPress === index ?

            <Box>
            <Flex justify="space-evenly">
            <SkeletonCircle size="25" isLoaded={!loading}/>
            <SkeletonCircle size="25" isLoaded={!loading}/>
            <SkeletonCircle size="25" isLoaded={!loading}/>
            </Flex>

            <SkeletonText 
                fadeDuration={3}
                colorScheme="blue" 
                mt="2" 
                noOfLines={7} 
                fontSize="lg"
                spacing="4"
                isLoaded={!loading}
            >
            <div className="posts-bits">
        
            {  
                allPost.length > 0 && allPost.map((child, list) => 
                    
                    <div className="comments-div" key={uuidv4()}>
                    <p className="comments-author">{child.author}</p>
                    <p className="comments-text">{child.body}</p>
                    <p className="timeStamp">{timeAgo(child.utc * 1000)}</p>
                    {
                        typeof child.replies === 'object' &&
                       
                        <TiMessage onClick={(e) => replyHandler(child.replies, list)} className="reddit-symbol post-symbol"/>
                        
                    }

                    <Reply 
                        allReplies={allReplies}
                        idx={list}
                        repliesClick={repliesClick}
                    />
                    
                    
                    </div>                   
                )
            }

            </div>
            </SkeletonText>
            </Box>
            : null
            }
        </>
    )
}

export default Post;




    