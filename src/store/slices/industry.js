// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    industries: [],
    subindustries: []
};

const slice = createSlice({
    name: 'industry',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getIndustriesSuccess(state, action){
            state.industries = action.payload;
        },

        getSubIndustriesSuccess(state, action){
            state.subindustries = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getIndustries() {
    return async () => {
        try {
            const response = await axios.get('/objects/industry');
            dispatch(slice.actions.getIndustriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getSubIndustries() {
    return async () => {
        try {
            const response = await axios.get('/objects/subIndustry');
            dispatch(slice.actions.getSubIndustriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
