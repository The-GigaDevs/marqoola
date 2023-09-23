// material-ui
import {
    CardContent,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';


// project imports
import ReactApexChart from 'react-apexcharts';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';


import { getOrganisationMetricsById } from 'store/slices/organisation';
import AssetChart from './AssetChart';
import EarningCard from './EarningCard';
import KeyControlCard from './KeyControlsCard';
import OrgChart from './OrgChart';
import PopularCard from './PopularCard';
import TotalControlReductionCard from './TotalControlReductionCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';


const Dashboard = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedOrganisation } = useSelector((state) => state.organisation);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.organisation);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const fakeData = [{ "x" : "3/1/2023", "y" :448791},
    { "x" : "3/8/2023", "y" :421123},
    { "x" : "3/15/2023", "y" :400212},
    { "x" : "3/22/2023", "y" :392232},
    { "x" : "3/29/2023", "y" :385623},
    { "x" : "4/5/2023", "y" :320230},
    { "x" : "4/12/2023", "y" :280312},
    { "x" : "4/19/2023", "y" :250312},
    { "x" : "4/26/2023", "y" :260312},
    { "x" : "5/3/2023", "y" :270312},
    { "x" : "5/10/2023", "y" :290312},
    { "x" : "5/17/2023", "y" :320045},
    { "x" : "5/24/2023", "y" :275646},
    { "x" : "5/31/2023", "y" :274146},
    { "x" : "6/7/2023", "y" :272646},
    { "x" : "6/14/2023", "y" :252646},
    { "x" : "6/21/2023", "y" :251146},
    { "x" : "6/28/2023", "y" :236146},
    { "x" : "7/5/2023", "y" :171146},
    { "x" : "7/12/2023", "y" :169646},
    { "x" : "7/19/2023", "y" :168146},
    { "x" : "7/26/2023", "y" :183146},
    { "x" : "8/2/2023", "y" :213146},
    { "x" : "8/9/2023", "y" :228146},
    { "x" : "8/16/2023", "y" :226646},
    { "x" : "8/23/2023", "y" :225146},
    { "x" : "8/30/2023", "y" :198146},
    { "x" : "9/6/2023", "y" :196646},
    { "x" : "9/13/2023", "y" :181646},
    { "x" : "9/20/2023", "y" :166646},
    { "x" : "9/27/2023", "y" :151646},]
    useEffect(() => {


    }, []);

    useEffect(() => {
        dispatch(getOrganisationMetricsById(selectedOrganisation.id))
    }, [selectedOrganisation]);


    useEffect(() => {
        setControlMetrics(fakeData);
        for (let i = 0; i < fakeData.length; i++) {
            let obj = fakeData[i];
            values.push(obj.y)
            xaxis.push(new Date(Date.parse(obj.x)).toLocaleDateString("en-US"))

        }

        setSeries([{
            name: 'Net Risk',
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
