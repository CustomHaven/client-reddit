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
                id: child.id, // id of the tweet
                author: child.author, // the guy who posted
                title: child.title, // content message
                name: child.subreddit, // name of subreddit like "memes"
                url: child.url_overridden_by_dest, // img or gif
                prefix: child.subreddit_name_prefixed, // r/memes
                subId: child.subreddit_id, // "t5_2qjpg"
                score: child.score, // preformance of the tweet example 51331  // get this to display
                comments: child.num_comments, // num of comments  // get this to display
                subscribers: child.subreddit_subscribers // all subscribers  // not needed atm
            }))
        },
        [homeSubredditThunk.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});
// console.log(homeSlice)
export const isLoading = state => state.home.isLoading;
export const selectHome = state => state.home.homeReddit;
export default homeSlice.reducer;

// mobile_banner_image   --- nice banner img on top level
// icon_img /r/whatever nice small icon img