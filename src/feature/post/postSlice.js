import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reddit from "../../util/reddit-data";

export const postThunk = createAsyncThunk(
    'post/postThunk',
    async (permalink) => {
        const post = await Promise.resolve(reddit.getPost(permalink))
        return post;
    }
);

export const repliesThunk = createAsyncThunk(
    'post/repliesThunk',
    async (permalink) => {
        const replies = await Promise.resolve(reddit.getPost(permalink))
        return replies;
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        replies: [],
        postLoading: false,
        postError: false
    },
    extraReducers: {
        [postThunk.pending]: (state) => {
            state.postLoading = true;
            state.postError = false;
        },
        [postThunk.fulfilled]: (state, action) => {
            state.postLoading = false;
            state.postError = false;

            state.posts = action.payload.map(child => ({
                body: child.body,
                permalink: child.permalink,
                replies: child.replies /// try .data.children as data is object and children is what we want
                // the array of objects
            }))
        },
        [postThunk.rejected]: (state) => {
            state.postLoading = false;
            state.postError = true;
        },



        [repliesThunk.pending]: (state) => {
            state.postLoading = true;
            state.postError = false;
        },
        [repliesThunk.fulfilled]: (state, action) => {
            state.postLoading = false;
            state.postError = false;
        },
        [repliesThunk.rejected]: (state) => {
            state.postLoading = false;
            state.postError = true;
        }
    }
})

export const selectPostLoading = (state) => state.posts.postLoading;
export const selectPost = (state) => state.posts.posts;
export default postSlice.reducer;