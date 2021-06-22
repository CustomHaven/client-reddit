import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reddit from "../../util/reddit-data";

export const postThunk = createAsyncThunk(
    'posts/postThunk',
    async (permalink) => {
        const post = await Promise.resolve(reddit.getPost(permalink))
        return post;
    }
);

export const repliesThunk = createAsyncThunk(
    'posts/repliesThunk',
    async (permalink) => {
        const replies = await Promise.resolve(reddit.getPost(permalink))
        return replies;
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        replies: [],
        repeatReplies: [],
        postLoading: false,
        postError: false
    },
    reducers: {
        repliesList(state, action) {
            state.replies = action.payload.data.children.map(child => ({
                id: child.data.id,
                author: child.data.author,
                body: child.data.body,
                permalink: child.data.permalink,
                utc: child.data.created_utc,
                replies: child.data.replies
            }))
        },
        repeatReplies(state, action) {
            // console.log("payload")
            // console.log(action.type);
            // console.log(action.payload);
            // console.log(action.type);
            // console.log("payload")
            // const index = state.repeatReplies.findIndex(f => f.id === action.payload.id);
            // const obj = 

            // const {id} = action.payload[0].id
            const obj = action.payload.map(child => ({
                id: child.id,
                author: child.author,
                body: child.body,
                permalink: child.permalink,
                utc: child.created_utc,
                replies: child.replies
            }))
            // console.log("obh")
            // console.log(obj)
            // console.log("obh")

            // // state.repeatReplies.concat(obj);
            // console.log("obj.length")
            // console.log(obj.length)
            // console.log("obj.length")
            Object.assign(state.repeatReplies, obj) /// this is the best way omdzzzzz

            // state.repeatReplies.concat(obj); /// fucking finally looks like we are getting somewhere
    }
    },
    extraReducers: {
        [postThunk.pending]: (state) => {
            state.postLoading = true;
            state.postError = false;
        },
        [postThunk.fulfilled]: (state, action) => {
            state.postLoading = false;
            state.postError = false;


                state.posts = (action.payload.map(child => ({
                    id: child.id,
                    author: child.author,
                    body: child.body,
                    permalink: child.permalink,
                    utc: child.created_utc,
                    replies: child.replies
                })))

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

export const { repliesList, repeatReplies } = postSlice.actions;
export const selectPostLoading = (state) => state.posts.postLoading;
export const selectPost = (state) => state.posts.posts;
export const selectRepliesList = (state) => state.posts.replies;
export const selectRepeatReplies = (state) => state.posts.repeatReplies;
export default postSlice.reducer;