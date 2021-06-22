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
            /* this grabs the inital reply from the post when the React.Component dispatches the replies to this payload */
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
            /* trying to make this reducer the one does the repeat for the replies */
            const obj = action.payload.map(child => ({ // returns array of object I know
                id: child.id,
                author: child.author,
                body: child.body,
                permalink: child.permalink,
                utc: child.created_utc,
                replies: child.replies
            }))
            
            // Object.assign({}, obj) /// this is the best way omdzzzzz
           
            state.repeatReplies.push(obj); /// fucking finally looks like we are getting somewhere
            // state.repeatReplies = state.repeatReplies[0];
    }
    },
    extraReducers: { // 
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
    }
})

export const { repliesList, repeatReplies } = postSlice.actions;
export const selectPostLoading = (state) => state.posts.postLoading;
export const selectPost = (state) => state.posts.posts;
export const selectRepliesList = (state) => state.posts.replies;
export const selectRepeatReplies = (state) => state.posts.repeatReplies;
export default postSlice.reducer;