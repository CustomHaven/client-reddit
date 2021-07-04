import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js';

export const searchThunk =  createAsyncThunk(
    'search/searchThunk',
    async (query) => {
        const searchTerm = await Promise.resolve(reddit.getSearch(query));
        return searchTerm;
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: [],
        searchQuery: '',
        searchTerm: '',
        buttonMenu: false,
        searchLoading: false,
        searchError: false
    },
    reducers: {
        searchInput(state, action) {
            state.searchTerm = action.payload;
        },
        clearSearch(state, action) {
            state.searchTerm = action.payload;
        },
        buttonToggle(state, action) {
            state.buttonMenu = action.payload;
        },
        querySearch(state, action) {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: {
        [searchThunk.pending]: (state) => {
            state.searchLoading = true;
            state.searchError = false;
        },
        [searchThunk.fulfilled]: (state, action) => {
            state.searchLoading = false;
            state.searchError = false;
            
            state.search = action.payload.map(child => ({
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
        [searchThunk.rejected]: (state) => {
            state.searchLoading = false;
            state.searchError = true;
        }
    }
})

export const { searchInput, clearSearch, buttonToggle, querySearch } = searchSlice.actions;
export const selectSearchTerm = state => state.search.searchTerm;
export const selectButtonMenu = state => state.search.buttonMenu;
export const selectSearch = state => state.search.search;
export const selectSearchLoading = state => state.search.searchLoading;
export const selectSearchError = state => state.search.searchError;
export const selectSearchQuery = state => state.search.searchQuery;

export default searchSlice.reducer;