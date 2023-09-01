// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    risks: [],
    selectedRisk: {},
    metrics : [],
    contextSelectorRisks: []

};

const slice = createSlice({
    name: 'risk',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getRisksSuccess(state, action) {
            state.risks = action.payload;
        },

        getRiskByIdSuccess(state, action){
            state.selectedRisk=action.payload;
        },

        getRiskMetricsSuccess(state, action){
            state.metrics=action.payload;
        },

        deleteRiskSuccess(state, action) {
            getRisks();
        },
        getRisksForSelectorSuccess(state, action) {
            state.contextSelectorRisks = action.payload;
        },

    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getRisks(orgId, assetId, riskId, objectiveId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const orgid = (orgId === '0' || orgId === '') ? '' : orgId;
            const assetid = (assetId === '0' || assetId === null) ? '' : assetId;
            const riskid = (riskId === '0' || riskId === null) ? '' : riskId;
            const objectiveid = (objectiveId === '0' || objectiveId === null) ? '' : objectiveId;
            const response = await axios.get('/objects/risks?filter[orgaid]=' + orgId + '&filter[assetid]=' + assetid + '&filter[riskid]=' + riskid + '&filter[objectiveid]=' + objectiveid, { headers });
            dispatch(slice.actions.getRisksSuccess(response.data));   
            
        } catch (error) {
            dispatch(slice.actions.getRisksSuccess([]));   
            dispatch(slice.actions.hasError(error));  
        }
    };
}



export function getRiskById(riskid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/risks/' + riskid, { headers });
                dispatch(slice.actions.getRiskByIdSuccess(response.data));   
            
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getRisksForSelector(token) {
    return async () => {
       
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            var url = '/objects/risks'
            
            const response = await axios.get(url, { headers});
            dispatch(slice.actions.getRisksForSelectorSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.getRisksForSelectorSuccess([]));
            dispatch(slice.actions.hasError(error));
            console.log(error);
        }
    
    };
}

export function getRiskMetricsById(riskid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/metrics?filter[objectid]=' + riskid, { headers });
                dispatch(slice.actions.getRiskMetricsSuccess(response.data));   
            
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getRisksForAsset(assetid) {
    return async () => {
        try {
            const response = await axios.get('/objects/risks?filter[assetid]=' + assetid );
            dispatch(slice.actions.getRisksSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteRisk(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/risks/' + id, {headers});
            dispatch(slice.actions.deleteRiskSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}



