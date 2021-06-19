import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data';
// import { subIsLoading } from '../subreddits/subredditsSlice';

export const popularThunk = createAsyncThunk(
    'popular/popularThunk',
    async () => {
        const popular = await Promise.resolve(reddit.getPopular());
        return popular;
    }
)

const popularSlice = createSlice({
    name: 'popular',
    initialState: {
        popular: [],
        popLoading: false,
        popHasError: false
    },
    extraReducers: {
        [popularThunk.pending]: (state) => {
            state.popLoading = true;
            state.popHasError = false;
        },
        [popularThunk.fulfilled]: (state, action) => {
            state.popLoading = false;
            state.popHasError = false;

            state.popular = action.payload.map(child => ({
                id: child.id, // id of the tweet
                author: child.author, // the guy who posted
                title: child.title, // content message
                name: child.subreddit, // name of subreddit like "memes"
                url: child.url_overridden_by_dest, // img or gif
                prefix: child.subreddit_name_prefixed, // r/memes
                subId: child.subreddit_id, // "t5_2qjpg"
                score: child.score, // preformance of the tweet example 51331
                comments: child.num_comments, // num of comments
                subscribers: child.subreddit_subscribers // all subscribers
            }))
        },
        [popularThunk.rejected]: (state) => {
            state.popLoading = false;
            state.popHasError = true;
        }
    }
});

export const selectPopLoading = state => state.popular.popLoading;
export const selectPopular = state => state.popular.popular;
export default popularSlice.reducer;






/* 
from reciving data
const regexValidation = /\.(:?jpg|gif|png)$/;
const children = jsonResponse.data.children.filter(child => 
    (regexValidation.test(child.data.url_overridden_by_dest) && child.data.url_overridden_by_dest))
*/


/*
score: 51331
num_comments: 20719
subreddit_subscribers: 32643830
*/