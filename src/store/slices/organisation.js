// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    organisations: [],
    organisationtree: [],
    organisationdetails: [],
    orders: [],
    products: [],
    productreviews: [],
    selectedOrganisation: {},
    metrics: []
};

const slice = createSlice({
    name: 'organisation',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getOrganisationSuccess(state, action) {
            state.organisations = action.payload;
        },

        // GET CUSTOMERS
        getOrganisationTreeSuccess(state, action) {
            state.organisationtree = action.payload;
        },

        getOrganisationDetailsSuccess(state, action) {
            state.organisationdetails = action.payload;
            state.selectedOrganisation = action.payload;
        },

        // GET ORDERS
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET PRODUCT REVIEWS
        getProductReviewsSuccess(state, action) {
            state.productreviews = action.payload;
        },
        getOrganisationMetricsSuccess(state, action) {
            state.metrics = action.payload
        },
        updateOrganisationSuccess(state, action) {

        },

        deleteOrganisationSuccess(state, action) {
            getOrganisations();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOrganisations(token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/organisations', { headers });
            dispatch(slice.actions.getOrganisationSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrganisationDetails(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/organisations/' + id, { headers });
            dispatch(slice.actions.getOrganisationDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrganisationMetricsById(controlid, token) {
    return () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            
                //const response = await axios.get('/objects/metrics?filter[objectid]=' + controlid, { headers });
                var data = [{"x": 1, "y": 1},{"x": 2, "y": 2}]
                dispatch(slice.actions.getOrganisationMetricsSuccess(data));   
            
            

        } catch (error) {
            dispatch(slice.actions.hasError(error));  
        }
    };
}

export function getOrganisationsTree() {
    return async () => {
        try {
            const response = await axios.get('/objects/organisations/treeview');
            dispatch(slice.actions.getOrganisationTreeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


export function deleteOrganisation(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/organisations/' + id, {headers});
            dispatch(slice.actions.deleteOrganisationSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateOrganisation(id, data, token){
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token,
                'Content-Type': 'application/json'
            };
            const response =  await axios.post('/objects/organisations/' + id, {
                name: data.name,
                parentid: data.parent,
                employeecount: parseInt(data.employeecount),
                annualrevenue: {number : parseInt(data.annualrevenue.number), currency: data.annualrevenue.currency},
                risktoleranceid: data.risktoleranceid,
                customercount: parseInt(data.customercount),
                loweramountmax: {number: parseInt(data.sliderData.value[0]), currency: data.annualrevenue.currency},
                toleranceamountmax: {number: parseInt(data.sliderData.value[1]), currency: data.annualrevenue.currency},
                data: {
                    description: data.data.description,
                    
                    industry: data.data.industry,
                    subindustry: data.data.subIndustry,
                }
            },{ headers });

                //dispatch(slice.actions.updateOrganisationSuccess(response.data,));
            getOrganisationDetails(id, token);
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            console.log(error)
        }
    }
}


    
