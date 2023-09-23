import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import {
    Grid,
    Stack,
    Typography,
    Card, CardContent
} from '@mui/material';
import { gridSpacing } from 'store/constant';
// project import
import useConfig from 'hooks/useConfig';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: [
            'AWS S3 Storage ',
'Dell PowerEdge Server ',
'Cisco Catalyst Switch ',
'HP ProLiant Blade Server ',
'VMware vSphere Licenses ',
'Microsoft Azure Cloud Credits ',
'Cisco ASA Firewall ',
'HP Storage Area Network (SAN) ',
'MacBook Pro Laptops (x5) ',
'Cisco IP Phones (x50) '
        ]
    }
};

// ==============================|| BAR CHART ||============================== //

const AssetChart = () => {
    const theme = useTheme();
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];

    const successDark = theme.palette.primary.dark;

    const [series] = useState([
        {
            data: [30123,
                15432,
                10567,
                12345,
                8765,
                9876,
                11234,
                14321,
                18654,
                3210,]
        }
    ]);

    const [options, setOptions] = useState(barChartOptions);

    React.useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [successDark],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary]
                    },
                    formatter: (value) => { return value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0
                    });  },
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    },
                    formatter: (value) => { return value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0
                    });  },
                }
            },
            grid: {
                borderColor: navType === 'dark' ? darkLight + 20 : grey200
            },
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        }));
    }, [navType, primary, darkLight, grey200, successDark]);

    return (
        <CardContent>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h4" color="secondary">Asset</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
<div id="chart">
<ReactApexChart options={options} series={series} type="bar" height={350} />
</div>
</Grid>
</CardContent>
    );
};

export default AssetChart;
