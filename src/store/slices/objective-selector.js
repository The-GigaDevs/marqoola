// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    selectedObjective:'',
    selectedObjectiveData: {}
    
};

const slice = createSlice({
    name: 'objectiveselector',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        setDivisionSelectorSuccess(state, action) {
            state.selectedObjective = action.payload;
        },

        getOrganisationDetailsSuccess(state, action) {
            state.selectedObjectiveData = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function setObjectiveSelector(id, token) {
    if (id == '0'){
        dispatch(slice.actions.setDivisionSelectorSuccess(id));
    }
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/objectives/' + id, { headers });
            dispatch(slice.actions.setDivisionSelectorSuccess(id));
            dispatch(slice.actions.getOrganisationDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}



