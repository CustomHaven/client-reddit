import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js';

export const subredditsThunk = createAsyncThunk(
    'subreddits/subredditsThunk',
    async (data) => {
        const reddits = await Promise.resolve(reddit.getAnyReddit(data));
        return reddits;
    }
);

const subredditsSlice = createSlice({
    name: 'home',
    initialState: {
        subreddits: [],
        subIsLoading: false,
        subHasError: false
    },
    extraReducers: {
        [subredditsThunk.pending]: (state) => {
            state.subIsLoading = true;
            state.subHasError = false;
        },
        [subredditsThunk.fulfilled]: (state, action) => {
            state.subIsLoading = false;
            state.subHasError = false;
            
            state.subreddits = action.payload.map(child => ({
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
        [subredditsThunk.rejected]: (state) => {
            state.subIsLoading = false;
            state.subHasError = true;
        }
    }
});
// console.log(homeSlice)
export const subIsLoading = state => state.subreddits.isLoading;
export const selectSubreddits = state => state.subreddits.subreddits;
export const selectSubIsLoading = state => state.subreddits.subIsLoading; 
export default subredditsSlice.reducer;