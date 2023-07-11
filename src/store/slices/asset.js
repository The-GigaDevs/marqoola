// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    assets: [],
    
};

const slice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getAssetsSuccess(state, action){
            state.assets = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getAssets() {
    return async () => {
        try {
            const response = await axios.get('/objects/assets');
            dispatch(slice.actions.getAssetsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


