// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    assettypes: [],
    assettypedetails: []
    
};

const slice = createSlice({
    name: 'risktolerance',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getAssetTypesSuccess(state, action) {
            state.assettypes = action.payload;
        },

        // GET CUSTOMERS
        getAssetTypeDetailsSuccess(state, action) {
            state.assettypedetails = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAssetTypes(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/enums/assettypes', { headers });
            dispatch(slice.actions.getAssetTypesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getAssetTypeDetails(token, id) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/enums/assettypes/' + id, { headers });
            dispatch(slice.actions.getAssetTypeDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
