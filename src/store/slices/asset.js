// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    assets: [],
    assetsbyorg: []
    
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
        },

        getAssetsByOrganisationSuccess(state, action){
            state.assetsbyorg = action.payload;
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

export function getAssetsByOrganisation(orgId) {
    return async () => {
        try {
            const response = await axios.get('/objects/assets?orga=' + orgId);
            dispatch(slice.actions.getAssetsByOrganisationSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

