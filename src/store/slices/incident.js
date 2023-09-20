// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    incidents: [],
    selectedIncident: {},
    metrics: [],
    contextSelectorIncidents: []
};

const slice = createSlice({
    name: 'incident',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getIncidentsSuccess(state, action) {
            state.incidents = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getIncidents(orgId, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const orgid = orgId === '0' || orgId === '' ? '' : orgId;
            const response = await axios.get('/objects/incidents?limit=10&locale=en', { headers });
            dispatch(slice.actions.getIncidentsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.getIncidentsSuccess([]));
            dispatch(slice.actions.hasError(error));
        }
    };
}
