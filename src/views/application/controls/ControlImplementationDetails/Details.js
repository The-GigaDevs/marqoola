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

import useAuth from 'hooks/useAuth';
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
import { getControlScenarioMetricsById } from 'store/slices/control';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

import { useFormik } from 'formik';
import * as yup from 'yup';
const avatarImage = require.context('assets/images/references', true);

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

const svgImages = [
    './iso-27001.svg',
    './SOC-2-Type-2.png',
    './pci_compliance_logo.png',
    './HIPAA_COMPLIANT.svg',
    './cis.svg'
    
  ];

const Details = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
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
    const [scenarioData, setScenarioData] = useState({});
    const { scenariometrics, selectedControlScenario } = useSelector((state) => state.control);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const { user } = useAuth();

    useEffect(() => {

    }, []);

    useEffect(() => {
        dispatch(getControlScenarioMetricsById(selectedControlScenario.controlid, selectedControlScenario.riskid, selectedControlScenario.objectiveid, user.accessToken))
    }, [selectedControlScenario]);


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
        setControlMetrics(scenariometrics);
        for (let i = 0; i < scenariometrics.length; i++) {
            let obj = scenariometrics[i];
            values.push(parseInt(obj.y))
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
    }, [scenariometrics]);



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

            const response = await axios.post('/objects/controls/' + selectedControlScenario.id,
                {
                    name: formik.values.name,
                    orgaid: formik.values.organisation,
                    assetid: formik.values.asset,
                    description: formik.values.description,
                    securityconceptid: formik.values.securityconcept,
                    controlcategoryid: formik.values.controlcategory,
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

            <ListItemButton style={style} key={selectedControlScenario.allrisks[index].id}>
                <ListItemText disableTypography style={{ color: secondary }} primary={selectedControlScenario.allrisks[index].name} />
            </ListItemButton>
        );
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedControlScenario.name,
            organisation: selectedControlScenario.orgaid,
            asset: selectedControlScenario.assetid,
            description: selectedControlScenario.description,
            controlcategory: selectedControlScenario.controlcategoryid,
            securityconcept: selectedControlScenario.securityconceptid,
            implementationcostnumber: selectedControlScenario.implementationcost && selectedControlScenario.implementationcost.number,
            implementationcostcurrency: selectedControlScenario.implementationcost && selectedControlScenario.implementationcost.currency,
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            handleSaveControl();
        }

    });

    return selectedControlScenario && selectedControlScenario.orgaid && series && (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedControlScenario.name}</Typography>

                    </>}
                        secondary={<><Chip label={selectedControlScenario.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControlScenario.implemented ? "success" : "error"} /><Typography variant="subtitle1">Last tested {selectedControlScenario.lasttested ? 'on ' + selectedControlScenario.lasttested : 'Never'}</Typography></>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8}>
                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Grid item>
                                            <Typography variant="h4">General</Typography>
                                            <br />
                                            <br />
                                        </Grid>
                                        <Stack direction="column" spacing={1} >

                                            <Stack direction="row" spacing={3}>
                                                <Grid item>
                                                    <Typography variant="h4">
                                                        Name:
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="h8">
                                                        {selectedControlScenario.name}
                                                    </Typography>
                                                </Grid>
                                            </Stack>
                                            <Grid item>
                                                <Stack direction="row" spacing={3}>
                                                    <Grid item>
                                                        <Typography variant="h4">
                                                            Code:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h8">
                                                            {selectedControlScenario.code}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <Stack direction="row" spacing={3}>
                                                    <Grid item>
                                                        <Typography variant="h4">
                                                            Description:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h8">
                                                            {selectedControlScenario.description}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </Grid>

                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                            <CardContent>
                                                <Grid item>
                                                    <Typography variant="h4">References</Typography>
                                                </Grid>
                                                <br/>
                                                <br/>
                                                <Grid item >
                                                    <Grid container spacing={5} >
                                                        {svgImages.map((svgUrl, index) => (
                                                            <Grid item xs={4} key={index}>
                                                                <img src={avatarImage(svgUrl)} height='50px' />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={gridSpacing}>

                            <Grid item xs={5}>

                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Stack direction="column" spacing={3} >
                                            <Grid item>
                                                <Typography variant="h4">Baseline Properties</Typography>
                                            </Grid>
                                            <Stack direction="column" spacing={1} >

                                                <Stack direction="row" spacing={3}>
                                                    <Grid item>
                                                        <Typography variant="h4">
                                                            Name:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h8">
                                                            {selectedControlScenario.name}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Security Concept:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.securityconceptname}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Implemented:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.implemented}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <br />
                                                <br />
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Pass Fail:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.iseffective}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <br />
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Date Tested:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.lasttested}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>


                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Stack direction="column" spacing={3} >
                                            <Grid item>
                                                <Typography variant="h4">Value</Typography>
                                            </Grid>
                                            <Stack direction="column" spacing={1} >

                                                <Stack direction="row" spacing={3}>
                                                    <Grid item>
                                                        <Typography variant="h4">
                                                            Control Value:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h8">
                                                            {selectedControlScenario.controlvalueformated}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Actual Risk Reduction:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.actualriskreductionformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Potential Risk Reduction:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.potentialriskreductionformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <br />
                                                <br />
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Current ROI:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.currentroiformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Potential ROI:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.potentialroiformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Stack direction="column" spacing={3} >
                                            <Grid item>
                                                <Typography variant="h4">Implementation Cost (annualized)</Typography>
                                            </Grid>
                                            <Stack direction="column" spacing={1} >

                                                <Stack direction="row" spacing={3}>
                                                    <Grid item>
                                                        <Typography variant="h4">
                                                            Hourly PS Rate:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h8">
                                                            {selectedControlScenario.othercostsformated}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                PS Hours:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.implementationhourlyformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Other Implementation Cost:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.implementationhours}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                --------------------------
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Stack direction="row" spacing={3}>
                                                        <Grid item>
                                                            <Typography variant="h4">
                                                                Implementation Cost:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="h8">
                                                                {selectedControlScenario.implementationcostformated}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
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

                </Grid>

            </Grid>
        </form>
    );
};

export default Details;
