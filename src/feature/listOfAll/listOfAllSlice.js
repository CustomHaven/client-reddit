import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reddit from '../../util/reddit-data.js';

export const listOfAllThunk = createAsyncThunk(
    'list/listOfAllThunk',
    async () => {
        const subreddits = await Promise.resolve(reddit.getSubreddits());
        return subreddits;
    }
);

const listOfAllSlice = createSlice({
    name: 'list',
    initialState: {
        listOfAll: [],
        menu: true,
        removeMenu: false,
        subListLoading: false,
        subListError: false
    },
    reducers: {
        displayMenu(state, action) {
            state.menu = action.payload;
        },
        takeMenuOff(state, action) {
            state.removeMenu = action.payload;
        }
    },
    extraReducers: {
        [listOfAllThunk.pending]: (state) => {
            state.subListLoading = true;
            state.subListError = false;
        },
        [listOfAllThunk.fulfilled]: (state, action) => {
            state.subListLoading = false;
            state.subListError = false;
            
            state.listOfAll = action.payload?.map(child => ({ 
                description: child.description,
                url: child.url,
                id: child.id,
                name: child.display_name,
                title: child.title,
                prefix: child.display_name_prefixed,
                headerImg: child.header_img,
                iconImg: child.icon_img,
                bannerImg: child.mobile_banner_image,
                publicInfo: child.public_description,
                utc: child.created_utc
            }))
        },
        [listOfAllThunk.rejected]: (state) => {
            state.subListLoading = false;
            state.subListError = true;
        }
    }
});

export const { displayMenu, takeMenuOff } = listOfAllSlice.actions;
export const selectMenu = state => state.listOfAll.menu;
export const selectremoveMenu = state => state.listOfAll.removeMenu;
export const selectListOfAll = state => state.listOfAll.listOfAll;
export default listOfAllSlice.reducer;