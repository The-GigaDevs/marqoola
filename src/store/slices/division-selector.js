// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    selectedDivision:'',
    selectedDivisionData: {}
    
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
            state.selectedDivision = action.payload;
        },

        getOrganisationDetailsSuccess(state, action) {
            state.selectedDivisionData = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function setDivisionSelector(id, token) {
    if (id == '0'){
        dispatch(slice.actions.setDivisionSelectorSuccess(id));
    }
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/organisations/' + id, { headers });
            dispatch(slice.actions.setDivisionSelectorSuccess(id));
            dispatch(slice.actions.getOrganisationDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}



