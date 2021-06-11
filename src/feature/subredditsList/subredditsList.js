import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js'

export const subredditsListThunk = createAsyncThunk(
    'subreddits/subredditsThunk',
    async () => {
        const subreddits = await Promise.resolve(reddit.getSubreddits());
        return subreddits;
    }
)

const subredditsListSlice = createSlice({
    name: 'subredditsList',
    initialState: {
        subredditsList: [],
        subListLoading: false,
        subListError: false
    },
    extraReducers: {
        [subredditsListThunk.pending]: (state) => {
            state.subListLoading = true;
            state.subListError = false;
        },
        [subredditsListThunk.fulfilled]: (state, action) => {
            state.subListLoading = false;
            state.subListError = false;
            
            state.subredditsList = action.payload.map(child => ({ 
                url: child.url,
                id: child.id,
                name: child.display_name,
                prefix: child.display_name_prefixed
            }))
        },
        [subredditsListThunk.rejected]: (state) => {
            state.subListLoading = false;
            state.subListError = true;
        }
    }
})

export const selectSubredditsList = state => state.subredditsList.subredditsList;
export default subredditsListSlice.reducer

