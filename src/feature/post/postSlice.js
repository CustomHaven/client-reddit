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
        parentCount: null,
        childCount: null,
        idCollection: [],
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
        clearAllReplies(state, action) {
            console.log("action.payload clear all replies")
            console.log(action.payload)
            console.log("action.payload clear all replies")
            state.replies = action.payload; /// basically the payload incoming will be [];
        },
        repeatReplies(state, action) {
            // console.log("payload")
            /* trying to make this reducer the one does the repeat for the replies */
            const arrayObject = action.payload.map(child => ({ // returns array of object I know
                id: child.id,
                author: child.author,
                body: child.body,
                permalink: child.permalink,
                utc: child.created_utc,
                replies: child.replies
            }))
            
            // Object.assign({}, obj) /// this is the best way omdzzzzz

            // const adding = state.repeatReplies.concat(arrayObject).filter(clones => clones !== arrayObject);

            state.repeatReplies.push(arrayObject)
           
            // state.repeatReplies = adding; /// fucking finally looks like we are getting somewhere
            // state.repeatReplies = state.repeatReplies[0];
        },
        parentAdd(state, action) {
            state.parentCount = action.payload;
        },
        parentDelete(state, action) {
            state.parentCount = action.payload;
        },
        childAdd(state, action) {
            state.childCount = action.payload;
        },
        childDelete(state, action) {
            state.childCount = action.payload;
        },
        idCollector(state, action) {
            console.log("action.payload id collector")
            console.log(action.payload)
            console.log("action.payload id collector")

            const adding = state.idCollection.concat(action.payload);
            console.log(adding)
            state.idCollection = adding;
        },
        idDeleter(state, action) {

            console.log("action.payload id deleter")
            console.log(action.payload)
            console.log("action.payload id deleter")

            
            const deletedUpdate = state.idCollection.filter(identity => identity !== action.payload);
            console.log("deletedUpdate")
            console.log(deletedUpdate)
            console.log("deletedUpdate")
            state.idCollection = deletedUpdate
            
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
    idDeleter,
    parentAdd,
    parentDelete,
    childAdd,
    childDelete,
    clearAllReplies,
} = postSlice.actions;
export const selectPostLoading = (state) => state.posts.postLoading;
export const selectPost = (state) => state.posts.posts;
export const selectRepliesList = (state) => state.posts.replies;
export const selectRepeatReplies = (state) => state.posts.repeatReplies;
export const selectIdCollection = (state) => state.posts.idCollection;
export const selectParentCount = (state) => state.posts.parentCount;
export const selectChildCount = (state) => state.posts.childCount;
export default postSlice.reducer;