import * as React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'store';
import useAuth from 'hooks/useAuth';
import { getOrganisationDetails } from 'store/slices/organisation';
import { getAssetDetails } from 'store/slices/asset';

export default function Review({basicInformationData, assetDetailsData}) {
    const dispatch = useDispatch();
   
    const { organisationdetails } = useSelector((state) => state.organisation);
    const [organisationDetailsData, setOrganisationDetailsData] = React.useState([]);

    const { assetdetails } = useSelector((state) => state.asset);
    const [parentDetailsData, setParentDetailsData] = React.useState({});
    const { user } = useAuth();

    React.useEffect(() => {
        dispatch(getOrganisationDetails(basicInformationData.organisation));
        dispatch(getAssetDetails(basicInformationData.parent, user.accessToken));
    
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
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
               Total Asset Value: {assetDetailsData.indirectassetvalue.number + assetDetailsData.directassetvalue.number} &nbsp; {assetDetailsData.directassetvalue.currency}  
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 , mt: 15, ml: 10}}>
               Asset Name: {basicInformationData.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2, ml: 10 }}>
               Description: {basicInformationData.description}
            </Typography>
            <Divider sx={{mt: 5, mb: 5}}/>
            <Grid container sx={{mx: 10}}>
                <Grid item xs={12}>
                    Indirect Asset Value: {assetDetailsData.indirectassetvalue.number} &nbsp; {assetDetailsData.indirectassetvalue.currency}
                </Grid>
                <Grid item xs={12}>
                    Direct Asset Value: {assetDetailsData.directassetvalue.number} &nbsp; {assetDetailsData.directassetvalue.currency}
                </Grid>
                
            </Grid>
            
         </>
    );
}
