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


const RiskDashboardCurrentRiskChart = ({ chartData }) => {
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
        axios.get('/risks/580750').then((response) => {
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
        }
    };
    const [series] = useState([
        {
            name: 'aaaa',
            data: values
        }
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
                    <Typography variant="h3">Current Risk</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                        <Typography variant="h2">A$ 123,456,789</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color='green'>fdsdfs</Typography>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
            </Box>
            </MainCard>
        </div>
    );
};

RiskDashboardCurrentRiskChart.propTypes = {
    chartData: PropTypes.object
};

export default RiskDashboardCurrentRiskChart;
