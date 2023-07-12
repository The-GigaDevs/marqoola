import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Box } from '@mui/material'

import MainCard from 'ui-component/cards/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';

import axios from 'utils/axios';

// chart options


// ==============================|| LINE CHART ||============================== //


const RiskDashboardControlLibrariesChart = ({ chartData }) => {
    const theme = useTheme();
    const { navType } = useConfig();
    
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;
    let values = [];
    let xaxis = [];
    const [risks, setRisks] = useState(null);
    

    useEffect(() => {
        axios.get('/risks/616f8176-6aa8-4288-8802-655f287e9a69').then((response) => {
            for (let i = 0; i < response.data.data.history.length; i++) {
                let obj = response.data.data.history[i];
                values.push(obj.value)
                xaxis.push(obj.date)
        
            }
          });
    }, []);


    const lineChartOptions = {
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
        },
        labels: ['Total passing']
    };
    const [series] = useState([
        70
    ]);


    const [options, setOptions] = useState(lineChartOptions);

    React.useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,

        }));
    }, [navType, primary, darkLight, grey200, secondary]);


    React.useEffect(() => {

    }, []);
    return (
        <div>
            <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
                                <Box
                                    sx={{
                                        p: 3
                                    }}
                                >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h3">Control Libraries</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                        <div id="chart1">
                <ReactApexChart options={options}  series={series} type="radialBar" height={200} />
            </div>
                        </Grid>
                        <Grid item>
                        <div id="chart2">
                <ReactApexChart options={options}  series={series} type="radialBar" height={200} />
            </div>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
            
            </Box>
            </MainCard>
        </div>
    );
};

RiskDashboardControlLibrariesChart.propTypes = {
    chartData: PropTypes.object
};

export default RiskDashboardControlLibrariesChart;
