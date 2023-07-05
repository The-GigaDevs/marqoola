// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    enumlist: [],
    enumData: [],

};

const slice = createSlice({
    name: 'enumeration',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },



        // GET ENUMS
        getEnumsSuccess(state, action) {
            state.enumlist = action.payload;
        },
        // GET ENUMS DATA
        getEnumDataSuccess(state, action) {
            state.enumData = action.payload;
        },

        // MODIFY CONTACT
        modifyEnumSuccess(state, action) {
            state.enumlist = action.payload;
        }

    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getEnums() {
    return async () => {
        try {
            const response = await axios.get('/manager/enums');
            dispatch(slice.actions.getEnumsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addEnum(enumlist) {
    return async () => {
        try {
            const response = await axios.post('/manager/enum/new',enumlist);
            dispatch(slice.actions.modifyEnumSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getEnumData(enumName) {
    return async () => {
        try {
            const response = await axios.get('/manager/enums/' + enumName);
            dispatch(slice.actions.getEnumDataSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };


}



