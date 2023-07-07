// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    risktolerances: [],
    risktolerancedetails: []
    
};

const slice = createSlice({
    name: 'risktolerance',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getRiskTolerancesSuccess(state, action) {
            state.risktolerances = action.payload;
        },

        // GET CUSTOMERS
        getRiskToleranceDetailsSuccess(state, action) {
            state.risktolerancedetails = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRiskTolerances() {
    return async () => {
        try {
            const response = await axios.get('/manager/enums/riskTolerance');
            dispatch(slice.actions.getRiskTolerancesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRiskToleranceDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/manager/enums/riskTolerance/' + id);
            dispatch(slice.actions.getRiskToleranceDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
