import React from 'react';
import { useSelector } from 'react-redux';
import { selectRepeatReplies } from '../../../../../feature/post/postSlice';
import { timeAgo } from '../../../../../util/mathWork.js';

const Utc = (props) => {
    const { id } = props;
    const repeat = useSelector(selectRepeatReplies);
    const reply = repeat.find(reply => reply.id === id)
    return <p className="utc-time">{timeAgo(reply?.utc * 1000)}</p>
}

export default Utc;