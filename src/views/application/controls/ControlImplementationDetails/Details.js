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
import RiskControlsTable from '../../risks/details/RiskControlsTable';

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

    return selectedControlScenario && selectedControlScenario.orgaid && series &&  (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedControlScenario.name}</Typography> 
                        
                        </>}
                        secondary={<><Chip label={selectedControlScenario.implemented ? "Implemented" : "Not Implemented"} variant="outlined" size="small" chipcolor={selectedControlScenario.implemented ? "success" : "error"} /><Typography variant="subtitle1">Last tested {selectedControlScenario.lasttested ? 'on ' + selectedControlScenario.lasttested : 'Never'}</Typography></>}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8}>        
                                <div id="chart">
                                    <ReactApexChart options={options} series={series} type="area" height={400} />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>
                                            <CardContent>
                                                <Stack direction="column" spacing={0} >
                                                    <Grid item>
                                                        <Typography variant="h4">{selectedControlScenario.name}</Typography>
                                                        <Typography variant="h4">Risk Scenario</Typography>
                                                    </Grid>
                                                    <Grid item><br/></Grid>
                                                    <Grid item>
                                                        <Stack direction="row">
                                                            <Grid item xs={8}>
                                                                <Typography variant="h5" color={primary}>
                                                                    Current Risk
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="h5" color={primary}>
                                                                    {selectedControlScenario.fo}
                                                                </Typography>
                                                            </Grid>
                                                        </Stack>
                                                        
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Typography variant="h4">About {selectedControlScenario.name}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h5" color={primary}>
                                                            {selectedControlScenario.description}
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
                        
                            <Grid item xs={12}>
                                
                                <RiskControlsTable />
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
