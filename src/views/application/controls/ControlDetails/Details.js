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
    Button, MenuItem
} from '@mui/material';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

import { useDispatch, useSelector } from 'store';

import { getOrganisations } from 'store/slices/organisation';
import { getAssets } from 'store/slices/asset';
import { getCurrencies } from 'store/slices/currency';
import { getControlCategories } from 'store/slices/controlcategory';
import { getObjectives } from 'store/slices/objective';
import { getSecurityConcepts } from 'store/slices/securityconcept';

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

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];



const Details = (controlData) => {
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


    useEffect(() => {
        dispatch(getOrganisations());
        dispatch(getAssets());
        dispatch(getCurrencies());
        dispatch(getControlCategories());
        dispatch(getObjectives());
        dispatch(getSecurityConcepts());
    }, []);

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

    const handleSaveControl = async () => {
        
        try {
            
            const response =  await axios.post('/objects/controls/' + selectedControl.id, 
            {
                name: formik.values.name,
                orgaid: formik.values.organisation, 
                assetid: formik.values.asset,
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedControl.name,
            organisation: selectedControl.orgaid,
            asset: selectedControl.assetid,
            implementationcostnumber: selectedControl.implementationcost && selectedControl.implementationcost.number,
            implementationcostcurrency: selectedControl.implementationcost && selectedControl.implementationcost.currency,
        },
        validationSchema,

    });

    return selectedControl && selectedControl.orgaid && (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={
                        <Chip label={selectedControl.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControl.implemented ? "success" : "error"} />
                    }
                        secondary={<Typography variant="subtitle1">Last tested {selectedControl.lasttested ? 'on ' + selectedControl.lasttested : 'Never'}</Typography>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container spacing={12}>
                                    <Grid item xs={5}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Name of Control"
                                            value={formik.values.name || ""}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
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
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={sxDivider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
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
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={sxDivider} />
                            </Grid>
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
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Products" content={false}>
                        <Grid container spacing={3}>


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

export default Details;
