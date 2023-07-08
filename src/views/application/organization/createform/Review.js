import * as React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'store';

import { getOrganisationDetails } from 'store/slices/organisation';
import { getRiskTolerances } from 'store/slices/risktolerance';

export default function Review({basicInformationData, divisionDetailsData, industryInformationData, riskToleranceData}) {
    const dispatch = useDispatch();
   
    const { organisationdetails } = useSelector((state) => state.organisation);
    const [organisationDetailsData, setOrganisationDetailsData] = React.useState([]);

    const [ filteredClassification, setFilteredClassification] = React.useState([]);
    const { risktolerances } = useSelector((state) => state.risktolerance);
    const [ riskToleranceDetailsData, setRiskToleranceData] = React.useState([]);

    React.useEffect(() => {
        dispatch(getOrganisationDetails(basicInformationData.parent));
        dispatch(getRiskTolerances());
    }, [dispatch]);

    React.useEffect(() => {
        setOrganisationDetailsData(organisationdetails);
    }, [organisationdetails]);

    React.useEffect(() => {
        setRiskToleranceData(risktolerances);
    }, [risktolerances]);

    React.useEffect(()=> {
        var filtered = riskToleranceDetailsData.filter(function (el) {
            return el.value == riskToleranceData.riskClassification
          });
          setFilteredClassification(filtered);
    }, [riskToleranceDetailsData])
    
    

    const test = basicInformationData.name;
   // console.log(filteredClassification[0].label)
   
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
            <Grid container sx={{my: 20, mx: 10}}>
                <Grid item xs={6}>
                    { filteredClassification.length > 0 && (<>
                    Risk class is {filteredClassification[0].label} </>)}
                </Grid>
                <Grid item xs={6}>
                   Tolerable range for risk is 
                </Grid>
                <Grid item xs={6}>
                    
                </Grid>
                <Grid item xs={6}>
                    {riskToleranceData.sliderData.value[0]} to {riskToleranceData.sliderData.value[1]}
                </Grid>
            </Grid>
         </>
    );
}
