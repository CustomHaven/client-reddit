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
                    id: child.id,
                    author: child.author,
                    title: child.title,
                    name: child.subreddit,
                    url: child.url_overridden_by_dest,
                    prefix: child.subreddit_name_prefixed,
                    subId: child.subreddit_id,
                    score: child.score,
                    comments: child.num_comments,
                    subscribers: child.subreddit_subscribers,
                    permalink: child.permalink,
                    utc: child.created_utc,
                    video: child?.secure_media?.reddit_video?.fallback_url,
                    duration: child?.secure_media?.reddit_video?.duration
            }))
        },
        [subredditsThunk.rejected]: (state) => {
            state.subIsLoading = false;
            state.subHasError = true;
        }
    }
});

export const subIsLoading = state => state.subreddits.isLoading;
export const selectSubreddits = state => state.subreddits.subreddits;
export const selectSubIsLoading = state => state.subreddits.subIsLoading; 
export default subredditsSlice.reducer;