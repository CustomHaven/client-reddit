import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js';

export const homeSubredditThunk = createAsyncThunk(
    'home/homeSubredditThunk',
    async () => {
        const home = await Promise.resolve(reddit.getHome());
        return home;
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeReddit: [],
        isLoading: false,
        hasError: false
    },
    extraReducers: {
        [homeSubredditThunk.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [homeSubredditThunk.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            
            state.homeReddit = action.payload.map(child => ({
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
        [homeSubredditThunk.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});

export const isLoading = state => state.home.isLoading;
export const selectHome = state => state.home.homeReddit;
export default homeSlice.reducer;