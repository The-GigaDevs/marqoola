// material-ui
import { useTheme } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    TextField, MenuItem, CardContent, Button
} from '@mui/material';


// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

import ThresholdSlider from '../createform/ThresholdSlider';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';


import { getOrganisationMetricsById, getOrganisations, updateOrganisation } from 'store/slices/organisation';
import { getRiskTolerances } from 'store/slices/risktolerance';
import { getIndustries, getSubIndustries } from 'store/slices/industry';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { getCurrencies } from 'store/slices/currency';

const validationSchema = yup.object({
    name: yup.string().required('Organisation name is required')
});


const Details = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { selectedOrganisation, organisations } = useSelector((state) => state.organisation);
    const { risktolerances } = useSelector((state) => state.risktolerance)
    const { industries } = useSelector((state) => state.industry)
    const { subindustries } = useSelector((state) => state.subindustry)
    const { currencies } = useSelector((state) => state.currency)
    const [sliderData, setSliderData] = useState({});
    const { riskToleranciesData, setRiskToleranciesData} = useState([]);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.organisation);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    const test = {
        value: [selectedOrganisation.loweramountmax ? selectedOrganisation.loweramountmax.number : 0, selectedOrganisation.toleranceamountmax? selectedOrganisation.toleranceamountmax.number:0]
    }
   
    useEffect(() => {
        dispatch(getCurrencies(user.accessToken));
        dispatch(getOrganisations(user.accessToken));
        dispatch(getRiskTolerances(user.accessToken));
        dispatch(getIndustries(user.accessToken));
        dispatch(getSubIndustries(user.accessToken));
        setSliderData(test);
    }, []);

    
    useEffect(() => {
        dispatch(getOrganisationMetricsById(selectedOrganisation.id))
    }, [selectedOrganisation]);

    useEffect(() => {
        setControlMetrics(risktolerances)
    }, [risktolerances]);

    useEffect(() => {
        setSliderData(sliderData)
    }, [sliderData]);


    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;
    let values = [];
    let xaxis = [];
    const { navType } = useConfig();


    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,

        }));
    }, [navType, primary, darkLight, grey200, secondary]);



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedOrganisation.name,
            parent: selectedOrganisation.parentid,
            description: selectedOrganisation.data.description,
            industry: selectedOrganisation.data.industry,
            subindustry: selectedOrganisation.data.subindustry,
            risktolerance: selectedOrganisation.risktoleranceid,
            numemployees: selectedOrganisation.employeecount,
            numcustomers: selectedOrganisation.customercount,
            annualrevenue: selectedOrganisation.annualrevenue && selectedOrganisation.annualrevenue.number,
            annualrevenuecurrency: selectedOrganisation.annualrevenue && selectedOrganisation.annualrevenue.currency,
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            handleSaveOrganisation();
        }
    });

   

    const handleSaveOrganisation = async () => {
        const data = {
            name: formik.values.name,
            parent: formik.values.parent,
            data: {
                description: formik.values.description,
                industry: formik.values.industry,
                subIndustry: formik.values.subindustry
            },
            risktoleranceid: formik.values.risktolerance,
            employeecount: formik.values.numemployees,
            customercount: formik.values.numcustomers,
            annualrevenue: {number: formik.values.annualrevenue, currency: formik.values.annualrevenuecurrency},
            sliderData : {
                value: [Object.keys(sliderData).length === 0 && sliderData.constructor === Object ?  selectedOrganisation.loweramountmax.number : sliderData.value[0], Object.keys(sliderData).length === 0 && sliderData.constructor === Object ?  selectedOrganisation.toleranceamountmax.number : sliderData.value[1]]
            }
        }
        dispatch(updateOrganisation(selectedOrganisation.id, data, user.accessToken));
    }

    return selectedOrganisation && series && (
        <form onSubmit={formik.handleSubmit} id="org-details">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedOrganisation.name}</Typography>

                    </>}
                    >
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={6}>

                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <SubCard title={<Typography variant="h4" color={primary}> Basic Information </Typography>} >
                                            <CardContent>
                                                <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <TextField
                                                            id="name"
                                                            name="name"
                                                            label="Name"
                                                            value={formik.values.name || selectedOrganisation.name}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                                            helperText={formik.touched.name && formik.errors.name}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="parent"
                                                            name="parent"
                                                            label="Parent"
                                                            value={formik.values.parent || selectedOrganisation.parentid}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.parent && Boolean(formik.errors.parent)}
                                                            helperText={formik.touched.parent && formik.errors.parent}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

organisations && organisations.map((parent) => (
                                                                    <MenuItem key={parent.id} value={parent.id}>
                                                                        {parent.name}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="description"
                                                            name="description"
                                                            label="Description"
                                                            value={formik.values.description || selectedOrganisation.data.description}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                                            helperText={formik.touched.description && formik.errors.description}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item><p/></Grid>
                                                    <Grid item><p/></Grid>
                                                </Stack>
                                            </CardContent>
                                        </SubCard>
                                    </Grid>
                                    <Grid item >
                                        <SubCard title={<Typography variant="h4" color={primary}> Operations </Typography>}>
                                            <CardContent>
                                                <Stack direction="column" spacing={3}>
                                                <Grid item>
                                                        <TextField
                                                            id="industry"
                                                            name="industry"
                                                            label="Industry"
                                                            value={formik.values.industry}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.industry && Boolean(formik.errors.industry)}
                                                            helperText={formik.touched.industry && formik.errors.industry}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

                                                                industries && industries.map((parent) => (
                                                                    <MenuItem key={parent.id} value={parent.id}>
                                                                        {parent.name}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                                    <TextField
                                                            id="subindustry"
                                                            name="subindustry"
                                                            label="Sub-Industry"
                                                            value={formik.values.subindustry}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.subindustry && Boolean(formik.errors.subindustry)}
                                                            helperText={formik.touched.subindustry && formik.errors.subindustry}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

                                                                subindustries && subindustries.map((parent) => (
                                                                    <MenuItem key={parent.id} value={parent.id}>
                                                                        {parent.name}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </SubCard>
                                    </Grid>
                                </Stack>

                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <SubCard title={<Typography variant="h4" color={primary}> Metrics </Typography>}>
                                            <CardContent>
                                            <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <TextField
                                                            id="numemployees"
                                                            name="numemployees"
                                                            label="Number of Employees"
                                                            value={formik.values.numemployees}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.numemployees && Boolean(formik.errors.numemployees)}
                                                            helperText={formik.touched.numemployees && formik.errors.numemployees}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack direction="row" spacing={gridSpacing}>
                                                        <Grid item xs={9}>
                                                        <TextField
                                                            id="annualrevenue"
                                                            name="annualrevenue"
                                                            label="Annual Revenue"
                                                            value={formik.values.annualrevenue}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.annualrevenue && Boolean(formik.errors.annualrevenue)}
                                                            helperText={formik.touched.annualrevenue && formik.errors.annualrevenue}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                    <TextField
                                                            id="annualrevenuecurrency"
                                                            name="annualrevenuecurrency"
                                                            label="annualrevenuecurrency"
                                                            value={formik.values.annualrevenuecurrency}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.annualrevenuecurrency && Boolean(formik.errors.annualrevenuecurrency)}
                                                            helperText={formik.touched.annualrevenuecurrency && formik.errors.annualrevenuecurrency}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

currencies && currencies.map((parent) => (
                                                                    <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                                                        {parent.Alpha}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item><p/></Grid>
                                                    <Grid item><p/></Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="numcustomers"
                                                            name="numcustomers"
                                                            label="Number of Customers"
                                                            value={formik.values.numcustomers}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.numcustomers && Boolean(formik.errors.numcustomers)}
                                                            helperText={formik.touched.numcustomers && formik.errors.numcustomers}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </SubCard>
                                    </Grid>
                                    <Grid item >
                                        <SubCard title={<Typography variant="h4" color={primary}> Risk Tolerance </Typography>}>
                                            <CardContent>
                                                <Stack direction="column" spacing={3}>
                                                    <Grid item>
                                                        <TextField
                                                            id="risktolerance"
                                                            name="risktolerance"
                                                            label="Risk Classification"
                                                            value={formik.values.risktolerance || selectedOrganisation.risktoleranceid}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.risktolerance && Boolean(formik.errors.risktolerance)}
                                                            helperText={formik.touched.risktolerance && formik.errors.risktolerance}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

                                                                risktolerances && risktolerances.map((parent) => (
                                                                    <MenuItem key={parent.id} value={parent.id}>
                                                                        {parent.label}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                                        <ThresholdSlider setSliderData={setSliderData} sliderData={test}/>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </SubCard>
                                    </Grid>


                                </Stack>
                            </Grid>
                        </Grid>

                    </SubCard>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={handleSaveOrganisation} >
                                    Save
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>

            </Grid>
        </form>
    );
};

export default Details;
