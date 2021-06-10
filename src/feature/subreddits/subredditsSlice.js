import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js'

export const subredditsThunk = createAsyncThunk(
    'subreddits/subredditsThunk',
    async () => {
        const subreddits = await Promise.resolve(reddit.getSubreddits());
        return subreddits;
    }
)

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        subLoading: false,
        subError: false
    },
    extraReducers: {
        [subredditsThunk.pending]: (state) => {
            state.subLoading = true;
            state.subError = false;
        },
        [subredditsThunk.fulfilled]: (state, action) => {
            state.subLoading = false;
            state.subError = false;
            state.subreddits = action.payload;
        },
        [subredditsThunk.rejected]: (state) => {
            state.subLoading = false;
            state.subError = true;
        }
    }
})

export const selectSubreddits = state => state.subreddits.subreddits;
export default subredditsSlice.reducer

