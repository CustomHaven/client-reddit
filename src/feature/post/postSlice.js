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
        repeatCount: null,
        idCollection: [],
        indexCount: 0,
        postLoading: false,
        postError: false
    },
    reducers: {
        repliesList(state, action) {
            /* this grabs the inital reply from the post when the React.Component dispatches the replies to this payload */
            const arrayObject = action.payload.data.children.map(child => ({
                id: child.data.id,
                author: child.data.author,
                body: child.data.body,
                permalink: child.data.permalink,
                utc: child.data.created_utc,
                replies: child.data.replies
            }))
            const adding = state.replies.concat(arrayObject);

            state.replies = adding
        },
        clearAllReplies(state, action) { // basically incoming payload will be [] so we just reset the state;
            state.replies = action.payload;
            state.repeatReplies = action.payload;
            state.idCollection = action.payload;
        },
        repeatReplies(state, action) {
            const arrayObject = action.payload?.map(child => ({
                id: child.id,
                author: child.author,
                body: child.body,
                permalink: child.permalink,
                utc: child.created_utc,
                replies: child.replies
            }))
            
            const adding = state.repeatReplies.concat(arrayObject).filter(clones => clones !== arrayObject);
           
            state.repeatReplies = adding;
        },
        countAdd(state, action) {
            state.repeatCount = action.payload;
        },
        countDelete(state, action) {
            state.repeatCount = action.payload;
        },
        idCollector(state, action) {

            const adding = state.idCollection.concat(action.payload);
            console.log(adding)
            state.idCollection = adding;
        },
        indexCount(state, action) {
            state.indexCount += action.payload; // just for fun trying to see how many renders happens
        },
        indexReset(state, action) { // reset it incoming payload is 0
            state.indexCount = action.payload;
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

export const { 
    repliesList, 
    repeatReplies, 
    idCollector,
    countAdd,
    countDelete,
    clearAllReplies,
    indexCount,
    indexReset
} = postSlice.actions;
export const selectPostLoading = (state) => state.posts.postLoading;
export const selectPost = (state) => state.posts.posts;
export const selectRepliesList = (state) => state.posts.replies;
export const selectRepeatReplies = (state) => state.posts.repeatReplies;
export const selectIdCollection = (state) => state.posts.idCollection;
export const selectRepeatCount = (state) => state.posts.repeatCount;
export const selectIndexCount = state => state.posts.indexCount;
export default postSlice.reducer;