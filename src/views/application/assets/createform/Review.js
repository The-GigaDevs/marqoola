import * as React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'store';

import { getOrganisationDetails } from 'store/slices/organisation';
import { getRiskTolerances } from 'store/slices/risktolerance';
import { getIndustries, getSubIndustries } from 'store/slices/industry';

export default function Review({basicInformationData, assetDetailsData}) {
    const dispatch = useDispatch();
   
    const { organisationdetails } = useSelector((state) => state.organisation);
    const [organisationDetailsData, setOrganisationDetailsData] = React.useState([]);
    const [industryDetailsData, setIndustryDetailsData] = React.useState([]);
    const [ filteredIndustry, setFilteredIndustry] = React.useState([]);
    const { industries } = useSelector((state) => state.industry);
    const [subIndustryDetailsData, setSubIndustryDetailsData] = React.useState([]);
    const [ filteredSubIndustry, setFilteredSubIndustry] = React.useState([]);
    const { subindustries } = useSelector((state) => state.industry);
    const [ filteredClassification, setFilteredClassification] = React.useState([]);
    const { risktolerances } = useSelector((state) => state.risktolerance);
    const [ riskToleranceDetailsData, setRiskToleranceData] = React.useState([]);

    React.useEffect(() => {
        dispatch(getOrganisationDetails(basicInformationData.organisation));
        dispatch(getRiskTolerances());
        dispatch(getIndustries());
        dispatch(getSubIndustries());
    }, [dispatch]);

    React.useEffect(() => {
        setOrganisationDetailsData(organisationdetails);
    }, [organisationdetails]);

    React.useEffect(() => {
        setRiskToleranceData(risktolerances);
    }, [risktolerances]);

    React.useEffect(() => {
        setIndustryDetailsData(industries);
    }, [industries]);

    React.useEffect(() => {
        setSubIndustryDetailsData(subindustries);
    }, [subindustries]);

    React.useEffect(()=> {
        var filtered = riskToleranceDetailsData.filter(function (el) {
            return el.value == riskToleranceData.riskClassification
          });
          setFilteredClassification(filtered);
    }, [riskToleranceDetailsData])

    React.useEffect(()=> {
        var filtered = industryDetailsData.filter(function (el) {
            return el.id == industryInformationData.industry
          });
          setFilteredIndustry(filtered);
    }, [industryDetailsData])

    React.useEffect(()=> {
        var filtered = subIndustryDetailsData.filter(function (el) {
            return el.id == industryInformationData.subIndustry
          });
          setFilteredSubIndustry(filtered);
    }, [subIndustryDetailsData])
    
    

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
                  {filteredIndustry.length > 0 && filteredSubIndustry.length >0 && (<>{filteredIndustry[0].name} - {filteredSubIndustry[0].name}</>)}
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
                    {riskToleranceData && riskToleranceData.sliderData && (<>{riskToleranceData.sliderData.value[0]} to {riskToleranceData.sliderData.value[1]}</>)}
                </Grid>
            </Grid>
         </>
    );
}
