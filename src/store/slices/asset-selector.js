// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    selectedAsset:'',
    selectedAssetData: {}
    
};

const slice = createSlice({
    name: 'divisionselector',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        setDivisionSelectorSuccess(state, action) {
            state.selectedAsset = action.payload;
        },

        getOrganisationDetailsSuccess(state, action) {
            state.selectedAssetData = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function setAssetSelector(id, token) {
    if (id == '0'){
        dispatch(slice.actions.setDivisionSelectorSuccess(id));
    }
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/assets/' + id, { headers });
            dispatch(slice.actions.setDivisionSelectorSuccess(id));
            dispatch(slice.actions.getOrganisationDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}



