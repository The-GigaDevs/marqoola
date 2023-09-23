// material-ui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Card, CardContent
} from '@mui/material';


// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';


import { getOrganisationMetricsById } from 'store/slices/organisation';


const Dashboard = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedOrganisation } = useSelector((state) => state.organisation);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.organisation);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        
        
    }, []);

    useEffect(() => {
        dispatch(getOrganisationMetricsById(selectedOrganisation.id))
    }, [selectedOrganisation]);


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
    


    return selectedOrganisation && series &&  (
        
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedOrganisation.name}</Typography> 
                        
                        </>}
                        >
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
                                                        <Typography variant="h2">{selectedOrganisation.controlvalueformated}</Typography>
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
                                                        <Typography variant="h2">{selectedOrganisation.implementationcostformated}</Typography>
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
                                                        <Typography variant="h2">{selectedOrganisation.implementationcostformated}</Typography>
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
                                                        <Typography variant="h2">{selectedOrganisation.implementationcostformated}</Typography>
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
                        
                    </SubCard>
                    
                </Grid>
                
            </Grid>
        
    );
};

export default Dashboard;
