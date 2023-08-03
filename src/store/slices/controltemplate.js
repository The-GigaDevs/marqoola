// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    controltemplates: [],
    selectedControlTemplate: {}

};

const slice = createSlice({
    name: 'controltemplate',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getControlTemplatesSuccess(state, action) {
            state.controltemplates = action.payload;
        },

        getControlTemplateByIdSuccess(state, action){
            state.selectedControlTemplate=action.payload;
        },

        deleteControlTemplateSuccess(state, action) {
            getControlTemplates();
        }

    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getControlTemplates(orgId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            if (orgId ==='' || orgId === '0' || orgId === undefined){
                const response = await axios.get('/objects/controltemplates', { headers });
                dispatch(slice.actions.getControlTemplatesSuccess(response.data));    
            }
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}



export function getControlTemplateById(controlid, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                const response = await axios.get('/objects/controltemplates/' + controlid, { headers });
                dispatch(slice.actions.getControlTemplateByIdSuccess(response.data));   
            
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}


export function deleteControlTemplate(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/controltemplates/' + id, {headers});
            dispatch(slice.actions.deleteControlTemplateSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


