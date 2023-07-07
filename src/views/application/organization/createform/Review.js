import * as React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'store';

import { getOrganisationDetails } from 'store/slices/organisation';

export default function Review({basicInformationData, divisionDetailsData, industryInformationData, riskToleranceData}) {
    const dispatch = useDispatch();
   
    const { organisationdetails } = useSelector((state) => state.organisation);
    const [organisationDetailsData, setOrganisationDetailsData] = React.useState([]);

    React.useEffect(() => {
        dispatch(getOrganisationDetails(basicInformationData.parent));
        
    }, [dispatch]);
    React.useEffect(() => {
        setOrganisationDetailsData(organisationdetails);
    }, [organisationdetails]);

    const test = basicInformationData.name;
    console.log(organisationDetailsData)
    return (
        <>
            <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
               Parent: {organisationDetailsData.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 , mt: 15, ml: 10}}>
               {basicInformationData.name}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2, ml: 10 }}>
               {basicInformationData.description}
            </Typography>
            <Divider sx={{mt: 5, mb: 5}}/>
            <Grid container sx={{mx: 10}}>
                <Grid item xs={6}>
                    {divisionDetailsData.numEmployees} Employees
                </Grid>
                <Grid item xs={6}>
                   {industryInformationData.industry} - {industryInformationData.subIndustry}
                </Grid>
            </Grid>
            <Grid container sx={{mx: 10}}>
                <Grid item xs={6}>
                    {divisionDetailsData.revenue} Annual Income
                </Grid>
                <Grid item xs={6}>
                   {industryInformationData.numCustomers} Customers
                </Grid>
            </Grid>
         </>
    );
}
