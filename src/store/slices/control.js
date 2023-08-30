// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    controls: [],
    selectedControl: {},
    metrics : []

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

        getControlMetricsSuccess(state, action){
            state.metrics=action.payload;
        },

        deleteControlSuccess(state, action) {
            getControls();
        }

    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getControls(orgId, assetid, riskid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const orgid = (orgId === '0' || orgId === '') ? null : orgId;
            const url = '/objects/controls?[orgaid]=' + orgid + '&filter[assetid]=' + assetid + '&filter[riskid]=' + riskid; 
            const response = await axios.get(url, { headers });
            dispatch(slice.actions.getControlsSuccess(response.data));   
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

export function getControlMetricsById(controlid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/metrics?filter[objectid]=' + controlid, { headers });
                dispatch(slice.actions.getControlMetricsSuccess(response.data));   
            
            

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

export function getControlsForTemplate(templateid) {
    return async () => {
        try {
            const response = await axios.get('/objects/controls?filter[templateid]=' + templateid );
            dispatch(slice.actions.getControlsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            const emptyControl = [{ 
                
            }]
            dispatch(slice.actions.getControlsSuccess(emptyControl))
        }
    };
}

export function deleteControl(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/controls/' + id, {headers});
            dispatch(slice.actions.deleteControlSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function runSquid(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/squids/runsquid/' + id, {headers});
            dispatch(slice.actions.deleteControlSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


