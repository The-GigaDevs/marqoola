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
    metrics : [],
    controlscenarios: [],
    selectedControlScenario: {},
    scenariometrics: []

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
        getControlScenariosSuccess(state, action){
            state.controlscenarios = action.payload;
        },
        getControlScenarioByIdSuccess(state, action){
            state.selectedControlScenario = action.payload;
        },
        getControlScenarioMetricsSuccess(state, action){
            state.scenariometrics = action.payload;
        },
        deleteControlSuccess(state, action) {
            getControls();
        }


    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getControls(orgId, assetId, riskId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const orgid = (orgId === '0' || orgId === '') ? '' : orgId;
            const assetid = (assetId === '0' || assetId === null) ? '' : assetId;
            const riskid = (riskId === '0' || riskId === null) ? '' : riskId;
            const url = '/objects/controls?filter[orgaid]=' + orgid + '&filter[assetid]=' + assetid + '&filter[riskid]=' + riskid; 
            const response = await axios.get(url, { headers });
            dispatch(slice.actions.getControlsSuccess(response.data));   
        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getControlScenarios(orgId, assetId, riskId, objectiveId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const orgid = (orgId === '0' || orgId === null) ? '' : orgId;
            const assetid = (assetId === '0' || assetId === null) ? '' : assetId;
            const riskid = (riskId === '0' || riskId === null) ? '' : riskId;
            const objectiveid = (objectiveId === '0' || objectiveId === null) ? '' : objectiveId;
            const url = '/objects/controlscenarios?filter[orgaid]=' + orgid + '&filter[assetid]=' + assetid + '&filter[riskid]=' + riskid + '&filter[objectiveid]=' + objectiveid; 
            const response = await axios.get(url, { headers });
            dispatch(slice.actions.getControlScenariosSuccess(response.data));   
        } catch (error) {
            dispatch(slice.actions.getControlScenariosSuccess([]));
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getControlScenarioById(controlscenario) {
    
        dispatch(slice.actions.getControlScenarioByIdSuccess(controlscenario));
    
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

export function getControlScenarioMetricsById(controlid, riskid, objectiveid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/metrics?filter[objectid]=' + controlid + '&filter[objectid2]=' + riskid + '&filter[objectid3]=' + objectiveid + '&filter[metrictype]=controlvalue', { headers });
                dispatch(slice.actions.getControlScenarioMetricsSuccess(response.data));   
            
            

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

export function getControlsForTemplate(templateid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/controls?filter[templateid]=' + templateid , {headers});
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


