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

const Costs = (controlData) => {
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
        for (let i = 0; i < metrics.length; i++) {
            let obj = metrics[i];
            values.push(obj.y)
            xaxis.push(new Date(Date.parse(obj.x)).toLocaleDateString("en-US"))

        }

        setSeries([{
            name: 'Implementation Cost',
            data: values
        }])
        setOptions({
            chart: {
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
            }
        })
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

            const response = await axios.post('/objects/controls/' + selectedControl.id,
                {
                    name: formik.values.name,
                    orgaid: formik.values.organisation,
                    assetid: formik.values.asset,
                    implementationcost: { number: formik.values.implementationcostnumber, currency: formik.values.implementationcostcurrency },
                }, {
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
                <ListItemText disableTypography style={{ color: secondary }} primary={selectedControl.allrisks[index].name} />
            </ListItemButton>
        );
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

    return selectedControl && selectedControl.orgaid && series && (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedControl.name}</Typography></>}
                        secondary={<><Chip label={selectedControl.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControl.implemented ? "success" : "error"} /><Typography variant="subtitle1">Last tested {selectedControl.lasttested ? 'on ' + selectedControl.lasttested : 'Never'}</Typography></>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4">Implementation Cost (annualized)</Typography>
                                    <Stack spacing={0}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={6}>
                                                <Stack spacing={0}>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                        Hourly PS Rate
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                        PS Hours
                                                    </Typography><Typography variant="h5" sx={{ mb: 1 }}>
                                                        Other Implementation Costs
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                                        
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                        Implementation Cost
                                                    </Typography>
                                                    </Stack>
                                            </Grid> 
                                            <Grid item xs={6}>
                                                <Stack spacing={0}>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                    {selectedControl.implementationcostformated ? selectedControl.implementationcostformated : 0}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                    {selectedControl.implementationhours ? selectedControl.implementationhours : 0}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                                    {selectedControl.othercostsformatted ? selectedControl.othercostsformatted : '$0'}  +s
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                                        
                                                    </Typography>
                                                    <Grid item xs={12}>
                            <Divider sx={ {borderColor: primary, borderBottomWidth: 2, width: '80px', mb: 1}} />
                        </Grid>
                                                    <Typography variant="h5" sx={{ mb: 3 }}>
                                                        {'$' + ((selectedControl.implementationcost ? parseInt(selectedControl.implementationcost.number) : 0) * (selectedControl.implementationhours ? parseInt(selectedControl.implementationhours) : 0)) + (selectedControl.othercosts ? parseInt(selectedControl.othercosts.number) : 0)}
                                                    </Typography>
                                                    </Stack>
                                            </Grid> 
                                            </Grid>       
                                        
                                        
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h4">Contracts</Typography>
                                    <FixedSizeList height={280} width="auto" itemSize={46} itemCount={selectedControl.allrisks && selectedControl.allrisks.length}>
                                        {renderRow}
                                    </FixedSizeList>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h4">Invoices</Typography>
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
                                </Grid>
                            </Grid>
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

export default Costs;
