// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    controlcategories: [],
    controlcategorydetails: {}

};

const slice = createSlice({
    name: 'controlcategory',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getControlCategorySuccess(state, action) {
            state.controlcategories = action.payload;
        },

        getControlCategoryDetailsSuccess(state, action) {
            state.controlcategorydetails = action.payload;
        },

        deleteControlCategorySuccess(state, action) {
            getControlCategories();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getControlCategories(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/controlcategories', { headers });
            dispatch(slice.actions.getControlCategorySuccess(response.data));    
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getControlCategoryDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/objects/controlcategories/' + id);
            dispatch(slice.actions.getControlCategoryDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteControlCategory(id) {
    return async () => {
        try {
            const response = await axios.delete('/objects/controlcategories/' + id);
            dispatch(slice.actions.deleteControlCategorySuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

