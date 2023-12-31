// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    assets: [],
    assetdetails: {},
    assetsbyorg: [],
    selectedAsset: {},
    contextSelectorAssets: []

};

const slice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        getAssetsSuccess(state, action) {
            state.assets = action.payload;
        },

        getAssetDetailsSuccess(state, action) {
            state.assetdetails = action.payload;
            state.selectedAsset = action.payload;
        },

        getAssetsByOrganisationSuccess(state, action) {
            state.assetsbyorg = action.payload;
        },

        getAssetsForSelectorSuccess(state, action) {
            state.contextSelectorAssets = action.payload;
        },

        deleteAssetSuccess(state, action) {
            getAssets();
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------



export function getAssetDetails(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.get('/objects/assets/' + id, { headers });
            dispatch(slice.actions.getAssetDetailsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getAssets(orgId, parentId, token) {
    return async () => {
       
        try {
            const headers = {
                Authorization: `Bearer ` + token,
                'Content-Type': 'application/json'
            };
            var url = ''
            if (orgId == null || orgId === '0' || orgId === '')
                url = '/objects/assets?'
            else
                url = '/objects/assets?filter[orgaid]=' + orgId
            
            if (parentId != null && parentId != '0' && parentId != '')
                url = url + '&filter[id]=' + parentId

            url = url.replace('?&', '?');
            const response = await axios.get(url, { headers});
            dispatch(slice.actions.getAssetsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.getAssetsSuccess([]));
            dispatch(slice.actions.hasError(error));
            console.log(error);
        }
    
    };
}

export function getAssetsForSelector(token) {
    return async () => {
       
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            var url = '/objects/assets'
            
            const response = await axios.get(url, { headers});
            dispatch(slice.actions.getAssetsForSelectorSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.getAssetsForSelectorSuccess([]));
            dispatch(slice.actions.hasError(error));
            console.log(error);
        }
    
    };
}

export function getAssetClusters(orgId, parentId, token) {
    return async () => {
       
        try {
            const headers = {
                Authorization: `Bearer ` + token,
                'Content-Type': 'application/json'
            };
            var url = ''
            if (orgId==='0')
                url = '/objects/assets?'
            else
                url = '/objects/assets?filter[orgaid]=' + orgId
            
            if (parentId != null || parentId != '0')
                url = url + '&filter[id]=' + parentId

            url = url.replace('?&', '?');
            const response = await axios.get(url, { headers});
            var assetsFiltered = response.data.filter(function (el) {
                return el.parentid === undefined;
              });
            

            dispatch(slice.actions.getAssetsSuccess(assetsFiltered));
        } catch (error) {
            dispatch(slice.actions.getAssetsSuccess([]));
            dispatch(slice.actions.hasError(error));
            console.log(error);
        }
    
    };
}

export function updateAsset(id, data, token){
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token,
                'Content-Type': 'application/json'
            };
            const response =  await axios.post('/objects/assets/' + id, {
                name: data.name,
                parentid: data.parent,
                assettypeid: data.assettype,
                orgaid: data.orgaId,
                data: {
                    description: data.data.description,
                }
            },{ headers });

                //dispatch(slice.actions.updateOrganisationSuccess(response.data,));
            getAssetDetails(id, token);
            
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            console.log(error)
        }
    }
}

export function deleteAsset(id, token) {
    return async () => {
        try {
            const headers = {
                Authorization: `Bearer ` + token
            };
            const response = await axios.delete('/objects/assets/' + id, {headers});
            dispatch(slice.actions.deleteAssetSuccess(response.data));
            dispatch(getAssets(null, null, token))
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

