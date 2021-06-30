import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data';

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
        [popularThunk.rejected]: (state) => {
            state.popLoading = false;
            state.popHasError = true;
        }
    }
});

export const selectPopLoading = state => state.popular.popLoading;
export const selectPopular = state => state.popular.popular;
export default popularSlice.reducer;