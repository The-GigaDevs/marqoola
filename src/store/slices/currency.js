// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    currencies: []
};

const slice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getCurrenciesSuccess(state, action){
            state.currencies = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getCurrencies() {
    return async () => {
        try {
            const response = await axios.get('/getCurrencies');
            dispatch(slice.actions.getCurrenciesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
