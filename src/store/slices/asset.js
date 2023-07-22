// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    assets: [],
    assetdetails: {},
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

        getAssetsSuccess(state, action) {
            state.assets = action.payload;
        },

        getAssetDetailsSuccess(state, action) {
            state.assetdetails = action.payload;
        },

        getAssetsByOrganisationSuccess(state, action) {
            state.assetsbyorg = action.payload;
        },

        deleteAssetSuccess(state, action) {
            getAssets();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getAssets(orgId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            if (orgId ==='' || orgId === '0' || orgId === undefined){
                const response = await axios.get('/objects/assets', { headers });
                dispatch(slice.actions.getAssetsSuccess(response.data));    
            }
            else {
                const response = await axios.get('/objects/assets?orga=' + orgId, { headers });
                dispatch(slice.actions.getAssetsSuccess(response.data));   
            }
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getAssetDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/objects/assets/' + id);
            dispatch(slice.actions.getAssetDetailsSuccess(response.data));
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

export function deleteAsset(id) {
    return async () => {
        try {
            const response = await axios.delete('/objects/assets/' + id);
            dispatch(slice.actions.deleteAssetSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

