import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';

// chart options
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
};

// ==============================|| LINE CHART ||============================== //

const RiskProgressChart = () => {
    const theme = useTheme();
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;

    const [series] = useState([
        {
            name: 'aaaa',
            data: [1323293, 1203403, 1450283, 1300283, 1402948, 1890230, 1784902, 2053584, 1981132]
        }
    ]);

    const [options, setOptions] = useState(lineChartOptions);

    React.useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            
        }));
    }, [navType, primary, darkLight, grey200, secondary]);
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={550} />
        </div>
    );
};

export default RiskProgressChart;
