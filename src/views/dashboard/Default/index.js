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
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';


import { getOrganisationMetricsById } from 'store/slices/organisation';
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalControlReductionCard from './TotalControlReductionCard';
import PopularCard from './PopularCard';
import KeyControlCard from './KeyControlsCard';
import OrgChart from './OrgChart';
import AssetChart from './AssetChart';


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
        for (let i = 0; i < metrics.length; i++) {
            let obj = metrics[i];
            values.push(obj.y)
            xaxis.push(new Date(Date.parse(obj.x)).toLocaleDateString("en-US"))

        }

        setSeries([{
            name: 'Implementation Cost',
            data: values
        }])
        setOptions({
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
            yaxis: {
                labels: {
                    show: true,
     
                    formatter: (value) => { return value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0
                    });  },
                }
            }
        })
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



    return selectedOrganisation && series && (

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={<><Typography variant="h1" color={secondary}> {selectedOrganisation.name}</Typography>

                </>}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={8}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <CardContent>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12}>
                                                <Grid container alignContent="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="h2" color="secondary">Cyber Risk Status</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <div id="chart">
                                                <ReactApexChart options={options} series={series} type="area" height={550} />
                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={4}>
                                    <TotalOrderLineChartCard />
                                </Grid>
                                <Grid item xs={4}>
                                    <EarningCard />
                                </Grid>
                                <Grid item xs={4}>
                                    <TotalControlReductionCard />
                                </Grid>
                                <Grid item xs={6}>
                                    <OrgChart />
                                </Grid>
                                <Grid item xs={6}>
                                    <AssetChart />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction="column" spacing={1}>
                                <Grid item >
                                    <PopularCard />
                                </Grid>
                                <Grid item >
                                    <KeyControlCard />
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
