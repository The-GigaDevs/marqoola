// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    securityconcepts: [],
    securityconceptdetails: {}

};

const slice = createSlice({
    name: 'securityconcept',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getSecurityConceptSuccess(state, action) {
            state.securityconcepts = action.payload;
        },

        getSecurityConceptDetailsSuccess(state, action) {
            state.securityconceptdetails = action.payload;
        },

        deleteSecurityConceptSuccess(state, action) {
            getSecurityConcepts();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getSecurityConcepts(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/securityconcepts', { headers });
            dispatch(slice.actions.getSecurityConceptSuccess(response.data));    
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getSecurityConceptDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/objects/securityconcepts/' + id);
            dispatch(slice.actions.getSecurityConceptDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteSecurityConcept(id) {
    return async () => {
        try {
            const response = await axios.delete('/objects/securityconcepts/' + id);
            dispatch(slice.actions.deleteSecurityConceptSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

