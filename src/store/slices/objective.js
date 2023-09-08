// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    objectives: [],
    objectivetemplates:[],
    objectivedetails: {},
    contextSelectorObjectives: []

};

const slice = createSlice({
    name: 'objective',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getObjectiveSuccess(state, action) {
            state.objectives = action.payload;
        },

        getObjectiveTemplateSuccess(state, action) {
            state.objectivetemplates = action.payload;
        },


        getObjectiveDetailsSuccess(state, action) {
            state.objectivedetails = action.payload;
        },

        getObjectivesForSelectorSuccess(state, action){
            state.contextSelectorObjectives = action.payload;
        },

        deleteObjectiveSuccess(state, action) {
            getObjectives();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getObjectives(orgId,assetId, token) {
    return async () => {
        try {
            const orgid = (orgId === '0' || orgId === null) ? '' : orgId;
            const assetid = (assetId === '0' || assetId === null) ? '' : assetId;
            const url = '/objects/objectives?filter[orgaid]=' + orgid + '&filter[assetid]=' + assetid; 
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get(url, { headers });
            dispatch(slice.actions.getObjectiveSuccess(response.data));    
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getObjectiveDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/objects/objectives/' + id);
            dispatch(slice.actions.getObjectiveDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getObjectivesForSelector(token) {
    return async () => {
       
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            var url = '/objects/objectives'
            
            const response = await axios.get(url, { headers});
            dispatch(slice.actions.getObjectivesForSelectorSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.getObjectivesForSelectorSuccess([]));
            dispatch(slice.actions.hasError(error));
            console.log(error);
        }
    
    };
}

export function getObjectiveTemplates(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/objectives?filter[istemplate]=true' , {headers});
            dispatch(slice.actions.getObjectiveTemplateSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            const emptyControl = [{ 
                
            }]
            dispatch(slice.actions.getObjectiveTemplateSuccess(emptyControl))
        }
    };
}


export function getObjectivesForTemplate(templateid, orgId, assetId, token) {
    return async () => {
        try {
            const orgid = (orgId === '0' || orgId === null) ? '' : orgId;
            const assetid = (assetId === '0' || assetId === null) ? '' : assetId;
            const url = '/objects/objectives?filter[templateid]=' + templateid + '&filter[orgaid]=' + orgid + '&filter[assetid]=' + assetid; 
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get(url , {headers});
            dispatch(slice.actions.getObjectiveSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            
            dispatch(slice.actions.getObjectiveSuccess([]))
        }
    };
}

export function getObjectivesForDivision(templateid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/objectives?filter[orgaid]=' + templateid , { headers });
            dispatch(slice.actions.getObjectiveSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteObjective(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/objectives/' + id, { headers });
            dispatch(slice.actions.deleteObjectiveSuccess(response.data));
            dispatch(getObjectiveTemplates(token))
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

