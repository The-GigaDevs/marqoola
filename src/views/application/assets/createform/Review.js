import * as React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'store';

import { getOrganisationDetails } from 'store/slices/organisation';
import { getAssetDetails } from 'store/slices/asset';

export default function Review({basicInformationData, assetDetailsData}) {
    const dispatch = useDispatch();
   
    const { organisationdetails } = useSelector((state) => state.organisation);
    const [organisationDetailsData, setOrganisationDetailsData] = React.useState([]);

    const { assetdetails } = useSelector((state) => state.asset);
    const [parentDetailsData, setParentDetailsData] = React.useState({});
    

    React.useEffect(() => {
        dispatch(getOrganisationDetails(basicInformationData.organisation));
        dispatch(getAssetDetails(basicInformationData.parent));
    
    }, [dispatch]);

    React.useEffect(() => {
        setOrganisationDetailsData(organisationdetails);
    }, [organisationdetails]);

    React.useEffect(() => {
        setParentDetailsData(assetdetails);
    }, [assetdetails]);


    
   // console.log(filteredClassification[0].label)
   
    return (
        <>
            <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
               Parent: {parentDetailsData.name}
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
               Organisation: {organisationDetailsData.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 , mt: 15, ml: 10}}>
               {basicInformationData.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2, ml: 10 }}>
               {basicInformationData.description}
            </Typography>
            <Divider sx={{mt: 5, mb: 5}}/>
            <Grid container sx={{mx: 10}}>
                <Grid item xs={12}>
                    Instrinsic Asset Value: {assetDetailsData.intrinsicassetvalue.number} &nbsp; {assetDetailsData.intrinsicassetvalue.currency}
                </Grid>
                
            </Grid>
            
         </>
    );
}
