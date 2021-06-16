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
        // nameList: {},
        subListLoading: false,
        subListError: false
    },
    // reducers: {
    //     nameList: (state, action) => {
    //         // const { name } = action.payload;
    //         state.nameList = action.payload
    //     }
    // },
    extraReducers: {
        [listOfAllThunk.pending]: (state) => {
            state.subListLoading = true;
            state.subListError = false;
        },
        [listOfAllThunk.fulfilled]: (state, action) => {
            state.subListLoading = false;
            state.subListError = false;
            
            state.listOfAll = action.payload.map(child => ({ 
                url: child.url,
                id: child.id,
                name: child.display_name,
                title: child.title,
                prefix: child.display_name_prefixed,
                headerImg: child.header_img,
                iconImg: child.icon_img,
                bannerImg: child.mobile_banner_image
            }))
 
        },
        [listOfAllThunk.rejected]: (state) => {
            state.subListLoading = false;
            state.subListError = true;
        }
    }
});

// export const { nameList } = subredditsListSlice.actions;
export const selectListOfAll = state => state.listOfAll.listOfAll;
// export const selectNameList = state => state.listOfAll.nameList;
export default listOfAllSlice.reducer;



// mobile_banner_image   --- nice banner img on top level
// icon_img /r/whatever nice small icon img

