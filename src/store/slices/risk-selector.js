// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    selectedRisk:'',
    selectedRiskData: {}
    
};

const slice = createSlice({
    name: 'riskselector',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        setDivisionSelectorSuccess(state, action) {
            state.selectedRisk = action.payload;
        },

        getOrganisationDetailsSuccess(state, action) {
            state.selectedRiskData = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function setRiskSelector(id, token) {
    if (id == '0'){
        dispatch(slice.actions.setDivisionSelectorSuccess(id));
    }
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/risks/' + id, { headers });
            dispatch(slice.actions.setDivisionSelectorSuccess(id));
            dispatch(slice.actions.getOrganisationDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}



