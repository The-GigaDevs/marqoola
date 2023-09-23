// material-ui
import { useTheme } from '@mui/material/styles';
import axios from 'utils/axios';
import { useEffect, useState } from 'react';
import {
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button, MenuItem, Card, CardHeader, CardContent
} from '@mui/material';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';


import { getOrganisations } from 'store/slices/organisation';
import { getAssets } from 'store/slices/asset';
import { getCurrencies } from 'store/slices/currency';
import { getControlCategories } from 'store/slices/controlcategory';
import { getObjectives } from 'store/slices/objective';
import { getSecurityConcepts } from 'store/slices/securityconcept';
import { getControlMetricsById } from 'store/slices/control';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Control name is required'),
});

const sxDivider = {
    borderColor: 'primary.light'
};

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

// table data
function createData(product, description, quantity, amount, total) {
    return { product, description, quantity, amount, total };
}

const DetailsDashboard = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedControl } = useSelector((state) => state.control);
    const [organisationData, setOrganisationData] = useState([]);
    const { organisations } = useSelector((state) => state.organisation);
    const [assetData, setAssetData] = useState([]);
    const { assets } = useSelector((state) => state.asset);
    const [currencyData, setCurrencyData] = useState([]);
    const { currencies } = useSelector((state) => state.currency);
    const [categoryData, setCategoryData] = useState([]);
    const { controlcategories } = useSelector((state) => state.controlcategory);
    const [objectiveData, setObjectiveData] = useState([]);
    const { objectives } = useSelector((state) => state.objective);
    const [securityConceptData, setSecurityConceptData] = useState([]);
    const { securityconcepts } = useSelector((state) => state.securityconcept);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.control);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        
        dispatch(getOrganisations());
        dispatch(getAssets());
        dispatch(getCurrencies());
        dispatch(getControlCategories());
        dispatch(getObjectives());
        dispatch(getSecurityConcepts());
    }, []);

    useEffect(() => {
        dispatch(getControlMetricsById(selectedControl.id))
    }, [selectedControl]);

    
    useEffect(() => {
        setOrganisationData(organisations);
    }, [organisations]);

    useEffect(() => {
        setAssetData(assets);
    }, [assets]);

    useEffect(() => {
        setCurrencyData(currencies);
    }, [currencies]);

    useEffect(() => {
        setCategoryData(controlcategories);
    }, [controlcategories]);

    useEffect(() => {
        setObjectiveData(objectives);
    }, [objectives]);

    useEffect(() => {
        setSecurityConceptData(securityconcepts);
    }, [securityconcepts]);

    useEffect(() => {
        setControlMetrics(metrics);
        for(let i = 0; i < metrics.length; i++){
            let obj = metrics[i];
            values.push(obj.y)
            xaxis.push(new Date(Date.parse(obj.x)).toLocaleDateString("en-US"))
    
        }
        
        setSeries([{
            name: 'Implementation Cost',
            data: values
        }])
        setOptions({chart: {
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: xaxis
        },
        yaxis: {
            labels: {
                show: true,
 
                formatter: (value) => { return value.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                });  },
            }
        }})
    }, [metrics]);
    
    

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
    

    const handleSaveControl = async () => {
        
        try {
            
            const response =  await axios.post('/objects/controls/' + selectedControl.id, 
            {
                name: formik.values.name,
                orgaid: formik.values.organisation, 
                assetid: formik.values.asset,
                description: formik.values.description,
                securityconceptid: formik.values.securityconcept,
                controlcategoryid: formik.values.controlcategory,
                implementationcost: {number:formik.values.implementationcostnumber,currency:formik.values.implementationcostcurrency}, 
            },{
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  'Content-Type': 'application/json'
                }
              });
        } catch (error) {
            console.log('Could not save control:', error)
            //handleCloseDialog();
        }
    
}

function renderRow(props) {
    const { index, style } = props;

    return (
        
        <ListItemButton style={style} key={selectedControl.allrisks[index].id}>
            <ListItemText disableTypography style={{color: secondary}} primary={selectedControl.allrisks[index].name} />
        </ListItemButton>
    );
}

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedControl.name,
            organisation: selectedControl.orgaid,
            asset: selectedControl.assetid,
            description: selectedControl.description,
            controlcategory: selectedControl.controlcategoryid,
            securityconcept: selectedControl.securityconceptid,
            implementationcostnumber: selectedControl.implementationcost && selectedControl.implementationcost.number,
            implementationcostcurrency: selectedControl.implementationcost && selectedControl.implementationcost.currency,
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            handleSaveControl();
        }

    });

    return selectedControl && selectedControl.orgaid && series &&  (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedControl.name}</Typography> 
                        
                        </>}
                        secondary={<><Chip label={selectedControl.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControl.implemented ? "success" : "error"} /><Typography variant="subtitle1">Last tested {selectedControl.lasttested ? 'on ' + selectedControl.lasttested : 'Never'}</Typography></>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8}>        
                                <div id="chart">
                                    <ReactApexChart options={options} series={series} type="area" height={550} />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h2">{selectedControl.controlvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h3" color={secondary}>
                                                            Control Value
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h2">{selectedControl.implementationcostformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h3" color={secondary}>
                                                            Reduction Potential
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h2">{selectedControl.implementationcostformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h3" color={secondary}>
                                                            Implementation Cost
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h2">{selectedControl.implementationcostformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h3" color={secondary}>
                                                            ROI
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container spacing={gridSpacing}>
                        
                            <Grid item xs={6}>
                                <Stack direction="column" spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label="Description"
                                            value={formik.values.description || ""}
                                            onChange={formik.handleChange}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                            id="controlcategory"
                                            name="controlcategory"
                                            label="Control Category"
                                            value={formik.values.controlcategory || selectedControl.controlcategoryid}
                                            onChange={formik.handleChange}
                                            error={formik.touched.controlcategory && Boolean(formik.errors.controlcategory)}
                                            helperText={formik.touched.controlcategory && formik.errors.controlcategory}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={selectedControl.controlcategoryid}>
                                                {selectedControl.controlcategoryname}
                                            </MenuItem>
                                            {

                                                categoryData && categoryData.map((parent) => (
                                                    <MenuItem key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <TextField
                                            id="securityconcept"
                                            name="securityconcept"
                                            label="Security Concept"
                                            value={formik.values.securityconcept || selectedControl.securityconceptid}
                                            onChange={formik.handleChange}
                                            error={formik.touched.securityconcept && Boolean(formik.errors.securityconcept)}
                                            helperText={formik.touched.securityconcept && formik.errors.securityconcept}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={selectedControl.securityconceptid}>
                                                {selectedControl.securityconceptname}
                                            </MenuItem>
                                            {

                                                securityConceptData && securityConceptData.map((parent) => (
                                                    <MenuItem key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                        { /*
                                        <TextField
                                            id="organisation"
                                            name="organisation"
                                            label="Organisation"
                                            value={formik.values.organisation || selectedControl.orgaid}
                                            onChange={formik.handleChange}
                                            error={formik.touched.organisation && Boolean(formik.errors.organisation)}
                                            helperText={formik.touched.organisation && formik.errors.organisation}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={selectedControl.orgaid}>
                                                {selectedControl.organame}
                                            </MenuItem>
                                            {

                                                organisationData && organisationData.map((parent) => (
                                                    <MenuItem key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                                */  }
                                    </Grid>

                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="column" spacing={2}>
                                    <FixedSizeList height={280} width="auto" itemSize={46} itemCount={selectedControl.allrisks && selectedControl.allrisks.length}>
                                        
                                            
                                           
                                            
                                                {renderRow}
                                           
                                           
                                        
                                    </FixedSizeList>

                                </Stack>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Divider sx={sxDivider} />
                            </Grid>
                            <Grid item xs={12}>
                               
                                <Grid container spacing={gridSpacing}>
                                     {/*
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Payment method</Typography>
                                            <TextField
                                                id="asset"
                                                name="asset"
                                                label="Asset"
                                                value={formik.values.asset || selectedControl.assetid}
                                                onChange={formik.handleChange}
                                                error={formik.touched.asset && Boolean(formik.errors.asset)}
                                                helperText={formik.touched.asset && formik.errors.asset}
                                                fullWidth
                                                select
                                            >
                                                <MenuItem value={selectedControl.assetid} key={selectedControl.assetid}>
                                                    {selectedControl.assetname}
                                                </MenuItem>
                                                {

                                                    assetData && assetData.map((parent) => (
                                                        <MenuItem key={parent.id} value={parent.id}>
                                                            {parent.name}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Financial Data</Typography>
                                            <Stack spacing={2}>

                                                <Stack direction="row" spacing={1}>
                                                    <Grid item xs={9} >
                                                        <TextField
                                                            id="implementationcostnumber"
                                                            name="implementationcostnumber"
                                                            label="Implementation Cost"
                                                            value={formik.values.implementationcostnumber || selectedControl.implementationcost.number}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.implementationcostnumber && Boolean(formik.errors.implementationcostnumber)}
                                                            helperText={formik.touched.implementationcostnumber && formik.errors.implementationcostnumber}
                                                            fullWidth

                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField
                                                            id="implementationcostcurrency"
                                                            name="implementationcostcurrency"
                                                            label="Currency"
                                                            value={formik.values.implementationcostcurrency || selectedControl.implementationcost.currency}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.implementationcostcurrency && Boolean(formik.errors.implementationcostcurrency)}
                                                            helperText={formik.touched.implementationcostcurrency && formik.errors.implementationcostcurrency}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

                                                                currencyData && currencyData.map((parent) => (
                                                                    <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                                                        {parent.Alpha}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Grid item xs={9} >
                                                        <TextField
                                                            id="controlvaluenumber"
                                                            name="controlvaluenumber"
                                                            label="Control Value"
                                                            value={formik.values.controlvaluenumber || selectedControl.controlvalue.number}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.controlvaluenumber && Boolean(formik.errors.controlvaluenumber)}
                                                            helperText={formik.touched.controlvaluenumber && formik.errors.controlvaluenumber}
                                                            fullWidth

                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField
                                                            id="controlvaluecurrency"
                                                            name="controlvaluecurrency"
                                                            label="Currency"
                                                            value={formik.values.controlvaluecurrency || selectedControl.controlvalue.currency}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.controlvaluecurrency && Boolean(formik.errors.controlvaluecurrency)}
                                                            helperText={formik.touched.controlvaluecurrency && formik.errors.controlvaluecurrency}
                                                            fullWidth
                                                            select
                                                        >
                                                            {

                                                                currencyData && currencyData.map((parent) => (
                                                                    <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                                                        {parent.Alpha}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
*/}
                                </Grid>
                            </Grid>
                            
                            
                            {/*
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Billing address</Typography>
                                            <TextField
                                            id="securityconcept"
                                            name="securityconcept"
                                            label="Security Concept"
                                            value={formik.values.securityconcept || selectedControl.securityconceptid}
                                            onChange={formik.handleChange}
                                            error={formik.touched.securityconcept && Boolean(formik.errors.securityconcept)}
                                            helperText={formik.touched.securityconcept && formik.errors.securityconcept}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={selectedControl.securityconceptid}>
                                                {selectedControl.securityconceptname}
                                            </MenuItem>
                                            {

                                                securityConceptData && securityConceptData.map((parent) => (
                                                    <MenuItem key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                        </Stack>
                                    </Grid>
                                    <Grid item sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Shipping address</Typography>
                                            <TextField
                                            id="controlcategory"
                                            name="controlcategory"
                                            label="Control Category"
                                            value={formik.values.controlcategory || selectedControl.controlcategoryid}
                                            onChange={formik.handleChange}
                                            error={formik.touched.controlcategory && Boolean(formik.errors.controlcategory)}
                                            helperText={formik.touched.controlcategory && formik.errors.controlcategory}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={selectedControl.controlcategoryid}>
                                                {selectedControl.controlcategoryname}
                                            </MenuItem>
                                            {

                                                categoryData && categoryData.map((parent) => (
                                                    <MenuItem key={parent.id} value={parent.id}>
                                                        {parent.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                                                */}
                        </Grid>
                    </SubCard>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={handleSaveControl}>
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

export default DetailsDashboard;
