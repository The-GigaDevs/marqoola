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
import RiskDashboardCurrentRiskChart from './RiskDashboardCurrentRiskChart';
import RiskDashboardControlLibrariesChart from './RiskDashboardControlLibrariesChart';
import { is } from 'date-fns/locale';
// chart options


// ==============================|| LINE CHART ||============================== //


const RiskDashboard = ({ chartData }) => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;
    const values = [];
    const xaxis = [];
    const [bbb, setBbb] = useState();

    const getBBB = useCallback(async () => {
        try {
            const response = await axios.get('/objects/risks/580749');
            setBbb(response);
            for (let i = 0; i < response.data.data.history.length; i++) {
                let obj = response.data.data.history[i];
                values.push(obj.value)
                xaxis.push(obj.date)

            }
            console.log('AAAAAAA')
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getBBB();
    }, [getBBB]);


    

    /*useEffect(() => {
        axios.get('/risks/580750').then((response) => {
            for (let i = 0; i < response.data.data.history.length; i++) {
                let obj = response.data.data.history[i];
                values.push(obj.value)
                xaxis.push(obj.date)

            }
            
        });
    }, []);*/


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
        setLoading(false);
    }, []);
    return ( bbb && (
        <div>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <RiskDashboardCurrentRiskChart isLoading={isLoading}/>
                </Grid>
                <Grid item>
                    <RiskDashboardControlLibrariesChart isLoading={isLoading}/>
                </Grid>
            </Grid>
        </div>
    ));
};

export default RiskDashboard;
