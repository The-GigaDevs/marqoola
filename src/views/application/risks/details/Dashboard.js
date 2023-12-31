// material-ui
import {
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useAuth from 'hooks/useAuth';

// third party

// project imports

import ReactApexChart from 'react-apexcharts';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';


import { getRiskMetricsById } from 'store/slices/risk';

import { useFormik } from 'formik';
import * as yup from 'yup';
import RiskControlsTable from './RiskControlsTable';

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

const Dashboard = () => {
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
    const { metrics, selectedRisk } = useSelector((state) => state.risk);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const [description, setDescription] = useState('');
    const [expandDescription, setExpandDescription] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
       
    }, []);

    useEffect(() => {
        if (Object.keys(selectedRisk).length > 0){
            if (expandDescription == true)
            setDescription(selectedRisk.description)
        else
            setDescription(selectedRisk.description.slice(0, 350))
        }
        
    }, [expandDescription]);

    useEffect(() => {
        if (Object.keys(selectedRisk).length > 0){
        dispatch(getRiskMetricsById(selectedRisk.id, user.accessToken))
        setDescription(selectedRisk.description.slice(0, 350))
        }
    }, [selectedRisk]);

    
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
            
            const response =  await axios.post('/objects/controls/' + selectedRisk.id, 
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

const handleExpandDescription = (event ) => {
    setExpandDescription(!expandDescription)
    
}

function renderRow(props) {
    const { index, style } = props;

    return (
        
        <ListItemButton style={style} key={selectedRisk.allrisks[index].id}>
            <ListItemText disableTypography style={{color: secondary}} primary={selectedRisk.allrisks[index].name} />
        </ListItemButton>
    );
}

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedRisk.name,
            organisation: selectedRisk.orgaid,
            asset: selectedRisk.assetid,
            description: selectedRisk.description,
            controlcategory: selectedRisk.controlcategoryid,
            securityconcept: selectedRisk.securityconceptid,
            implementationcostnumber: selectedRisk.implementationcost && selectedRisk.implementationcost.number,
            implementationcostcurrency: selectedRisk.implementationcost && selectedRisk.implementationcost.currency,
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            handleSaveControl();
        }

    });

    return selectedRisk  && series &&  (
        <form onSubmit={formik.handleSubmit} id="asset-forms">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedRisk.name}</Typography></>}>
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
                                                        <Typography variant="h4">{selectedRisk.name}</Typography>
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
                                                                    {selectedRisk.fo}
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
                                                        <Typography variant="h4">About {selectedRisk.name}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h5" color={primary}>
                                                            {description} { expandDescription ? '' : ' ...'}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h4" onClick={(event) => { handleExpandDescription(event) }}>{ expandDescription ? 'Less' : 'More'} </Typography>
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

export default Dashboard;
