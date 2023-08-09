// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    objectives: [],
    objectivetemplates:[],
    objectivedetails: {}

};

const slice = createSlice({
    name: 'objective',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getObjectiveSuccess(state, action) {
            state.objectives = action.payload;
        },

        getObjectiveTemplateSuccess(state, action) {
            state.objectivetemplates = action.payload;
        },


        getObjectiveDetailsSuccess(state, action) {
            state.objectivedetails = action.payload;
        },

        deleteObjectiveSuccess(state, action) {
            getObjectives();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function getObjectives(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/objectives', { headers });
            dispatch(slice.actions.getObjectiveSuccess(response.data));    
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getObjectiveDetails(id) {
    return async () => {
        try {
            const response = await axios.get('/objects/objectives/' + id);
            dispatch(slice.actions.getObjectiveDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getObjectiveTemplates(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/objectives?filter[istemplate]=true' , {headers});
            dispatch(slice.actions.getObjectiveTemplateSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            const emptyControl = [{ 
                
            }]
            dispatch(slice.actions.getObjectiveTemplateSuccess(emptyControl))
        }
    };
}


export function getObjectivesForTemplate(templateid) {
    return async () => {
        try {
            const response = await axios.get('/objects/objectives?filter[templateid]=' + templateid );
            dispatch(slice.actions.getObjectiveSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            const emptyControl = [{ 
                
            }]
            dispatch(slice.actions.getObjectiveSuccess(emptyControl))
        }
    };
}

export function deleteObjective(id) {
    return async () => {
        try {
            const response = await axios.delete('/objects/objectives/' + id);
            dispatch(slice.actions.deleteObjectiveSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
