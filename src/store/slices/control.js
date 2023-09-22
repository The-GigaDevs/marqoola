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
    scenariometrics: [],
    squidresponse: ''

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
        runSquidResult(state, action){
            state.squidresponse = action.payload;
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
            const riskid = (riskId === '0' || riskId === null || riskId === '') ? '' : riskId;
            const objectiveid = (objectiveId === '0' || objectiveId === null || objectiveId === '') ? '' : objectiveId;
            const url = '/objects/controlscenarios?filter[orgaid]=' + orgid + '&filter[assetid]=' + assetid + '&filter[riskid]=' + riskid + '&filter[objectiveid]=' + objectiveid; 
            const response = await axios.get(url, { headers });
            dispatch(slice.actions.getControlScenariosSuccess(response.data));   
        } catch (error) {
            console.log(error);
            dispatch(slice.actions.getControlScenariosSuccess([]));
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function setControlScenarioBy(controlscenario) {
    
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
            dispatch(slice.actions.getControlsSuccess([]));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getControlsForRisk(riskid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/controls', {headers} );

            var subIndustriesFiltered = filterByAllRiskId(response.data, riskid)
            
            const filtered = response.data.filter((el) => {
                return subIndustriesFiltered.some((f) => {
                  return f.id === el.id;
                });
              });
              
            dispatch(slice.actions.getControlsSuccess(filtered));
        } catch (error) {
            dispatch(slice.actions.getControlsSuccess([]));
            dispatch(slice.actions.hasError(error));
        }
    };
}

function filterByAllRiskId(data, idToFilter) {
    // Use the map function to iterate over the outer array and filter the inner 'allrisks' array
    const filteredData = data.map(item => {
      const filteredAllRisks = item.allrisks.filter(allRisk => allRisk.id === idToFilter);
      return { id: item.id, allrisks: filteredAllRisks };
    });
  
    // Remove items with empty 'allrisks' arrays
    return filteredData.filter(item => item.allrisks.length > 0 && Object.keys(item.allrisks[0]).length > 0);
  }

export function runSquid(squidid, token){
    return async () => {
        try{
            const headers = {
                Authorization: `Bearer ` + token,
                'Content-Type': 'application/json'
            };
            const response = await axios.get('/squids/runsquid/' + squidid , {headers});
            dispatch(slice.actions.runSquidResult(response.data.message));
            return true;
        }
        catch(error)
        {
            console.log(error);
            return false;
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




