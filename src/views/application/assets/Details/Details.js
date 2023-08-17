// material-ui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Card, CardContent
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';


// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';


import { getOrganisationMetricsById } from 'store/slices/organisation';


const Details = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedAsset } = useSelector((state) => state.asset);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.organisation);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (selectedAsset.metrics){
            for(let i = 0; i < selectedAsset.metrics.length; i++){
                let obj = selectedAsset.metrics[i];
                values.push(obj.value)
                xaxis.push(new Date(Date.parse(obj.eventdate)).toLocaleDateString("en-US"))
        
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
        }
        
    }, []);

    useEffect(() => {
        
    }, [selectedAsset]);


    useEffect(() => {
        setControlMetrics(metrics);
        
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
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedAsset.name,
            parent: selectedAsset.parentid,
            description: selectedAsset.data.description,
            assettype: selectedAsset.assettypeid,
        },
        onSubmit: (values, helpers) => {
            //handleSaveAsset();
        }
    });

    return selectedAsset && series &&  (
        
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedAsset.name}</Typography> 
                        
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
                                                        <Typography variant="h3">{selectedAsset.controlvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Asset Value
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
                                                        <Typography variant="h3">{selectedAsset.intrinsicassetvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Intrinsic Asset Value
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
                                                        <Typography variant="h3">{selectedAsset.implementationcostformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Business Continuity
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
                                                        <Typography variant="h3">{selectedAsset.totalassetvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Total Asset Value
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

export default Details;
