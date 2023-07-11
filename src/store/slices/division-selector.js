// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    selectedDivision:'',
    
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

       
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function setDivisionSelector(id) {
    return () => {
        try {
            
            dispatch(slice.actions.setDivisionSelectorSuccess(id));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}





