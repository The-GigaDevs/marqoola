import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';



// chart options


// ==============================|| LINE CHART ||============================== //


const RiskProgressChart = ({chartData}) => {
    const theme = useTheme();
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;

    let values = [];
    let xaxis = [];
    for(let i = 0; i < chartData.history.length; i++){
        let obj = chartData.history[i];
        values.push(obj.value)
        xaxis.push(obj.date)

    }

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
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

RiskProgressChart.propTypes = {
    chartData: PropTypes.object
};

export default RiskProgressChart;
