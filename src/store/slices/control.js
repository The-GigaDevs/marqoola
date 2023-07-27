// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    controls: [],
    selectedControl: {}

};

const slice = createSlice({
    name: 'control',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getControlsSuccess(state, action) {
            state.controls = action.payload;
        },

        getControlByIdSuccess(state, action){
            state.selectedControl=action.payload;
        },

        deleteControlSuccess(state, action) {
            getControls();
        }

    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getControls(orgId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            if (orgId ==='' || orgId === '0' || orgId === undefined){
                const response = await axios.get('/objects/controls', { headers });
                dispatch(slice.actions.getControlsSuccess(response.data));    
            }
            else {
                const response = await axios.get('/objects/controls?orga=' + orgId, { headers });
                dispatch(slice.actions.getControlsSuccess(response.data));   
            }
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}



export function getControlById(controlid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/controls/' + controlid, { headers });
                dispatch(slice.actions.getControlByIdSuccess(response.data));   
            
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getControlsForAsset(assetid) {
    return async () => {
        try {
            const response = await axios.get('/objects/controls?filter[assetid]=' + assetid );
            dispatch(slice.actions.getControlsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


export function deleteControl(id) {
    return async () => {
        try {
            const response = await axios.delete('/objects/controls/' + id);
            dispatch(slice.actions.deleteControlSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


