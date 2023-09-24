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
import { openSnackbar } from 'store/slices/snackbar';
import useAuth from 'hooks/useAuth';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip';
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
import { intlFormatDistance } from 'date-fns'

import { getOrganisations } from 'store/slices/organisation';
import { getAssets } from 'store/slices/asset';
import { getCurrencies } from 'store/slices/currency';
import { getControlCategories } from 'store/slices/controlcategory';
import { getObjectives } from 'store/slices/objective';
import { getSecurityConcepts } from 'store/slices/securityconcept';
import { getControlScenarioMetricsById, runSquid } from 'store/slices/control';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

import IntegrationInformation from '../IntegrationInformation';

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

const DetailsDashboard = () => {
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
    const [open, setOpen] = useState(false);
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
        for(let i = 0; i < scenariometrics.length; i++){
            let obj = scenariometrics[i];
            values.push(parseInt(obj.y))
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
            
            const response =  await axios.post('/objects/controls/' + selectedControlScenario.id, 
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
        
        <ListItemButton style={style} key={selectedControlScenario.allrisks[index].id}>
            <ListItemText disableTypography style={{color: secondary}} primary={selectedControlScenario.allrisks[index].name} />
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

    const handleSquidButton = async (event, id) => {
        const result = await dispatch(runSquid(id, user.accessToken));
        if (result == true){
        dispatch(
            openSnackbar({
                open: true,
                message: 'Squid started successfully',
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: true

            })
        )
        }
        else if (result == false){
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Squid failed to start',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
    
                })
            )
        }
        
    }

    return selectedControlScenario && selectedControlScenario.orgaid && series &&  (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedControlScenario.name}</Typography> 
                        
                        </>}
                        secondary={<><Chip label={selectedControlScenario.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControlScenario.implemented ? "success" : "error"} /><Typography variant="subtitle1">Last tested {selectedControlScenario.lasttested ? <MuiTooltip title={(selectedControlScenario.lasttested).toLocaleString() } arrow placement="bottom">
                        {intlFormatDistance(
Date.parse(selectedControlScenario.lasttested) ,
Date.now()
)}
</MuiTooltip>: 'Never'}</Typography></>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={10}>        
                                <div id="chart">
                                    <ReactApexChart options={options} series={series} type="area" height={550} />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h2">{selectedControlScenario.controlvalueformated}</Typography>
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
                                                        <Typography variant="h2">{selectedControlScenario.potentialriskreductionformated}</Typography>
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
                                                        <Typography variant="h2">{selectedControlScenario.implementationcostformated}</Typography>
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
                                                        <Typography variant="h2">{selectedControlScenario.currentroiformated}</Typography>
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
                        
                            <Grid item xs={5}>
                                
                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <Typography variant="h4">Details</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h5">
                                                            Name: {selectedControlScenario.name}<br/>
                                                            Description : {selectedControlScenario.description}
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>

                                
                            </Grid>
                            <Grid item xs={5}>
                                <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <Typography variant="h4">Context</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h5">
                                                            Organisation: {selectedControlScenario.organame}<br/>
                                                            Asset : {selectedControlScenario.assetname}<br/>
                                                            Risk: {selectedControlScenario.riskname}<br/>
                                                            Objective: {selectedControlScenario.objectivename}
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Stack>
                                            </CardContent>
                                        </Card>
                            </Grid>
                            <Grid item xs={2}>
                            <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <Typography variant="h4">Run Details</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h5" >
                                                        <MuiTooltip title={(selectedControlScenario.lasttested).toLocaleString() } arrow placement="left">
                                                            Last run {intlFormatDistance(
          Date.parse(selectedControlScenario.lasttested) ,
          Date.now()
        )}
        </MuiTooltip>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button variant="contained" onClick={(event) => { handleSquidButton(event, selectedControlScenario.controlid) }}>Run Now</Button>&nbsp;&nbsp;&nbsp;
                                                        <Button variant="contained" color="error" onClick={(event) => { setOpen(true)  }}>
                                            Fix Now !
                                            </Button>
                                            <IntegrationInformation setOpen={setOpen} open={open}/>
                                                    </Grid>
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
