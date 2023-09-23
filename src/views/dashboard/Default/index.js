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
    const fakeData = [{ "x" : "8/1/2023", "y" :248008},
    { "x" : "8/2/2023", "y" :346410},
    { "x" : "8/3/2023", "y" :325842},
    { "x" : "8/4/2023", "y" :267136},
    { "x" : "8/5/2023", "y" :394077},
    { "x" : "8/6/2023", "y" :402806},
    { "x" : "8/7/2023", "y" :279684},
    { "x" : "8/8/2023", "y" :248358},
    { "x" : "8/9/2023", "y" :352187},
    { "x" : "8/10/2023", "y" :355727},
    { "x" : "8/11/2023", "y" :347623},
    { "x" : "8/12/2023", "y" :197225},
    { "x" : "8/13/2023", "y" :298944},
    { "x" : "8/14/2023", "y" :298380},
    { "x" : "8/15/2023", "y" :177710},
    { "x" : "8/16/2023", "y" :353267},
    { "x" : "8/17/2023", "y" :333175},
    { "x" : "8/18/2023", "y" :204675},
    { "x" : "8/19/2023", "y" :429777},
    { "x" : "8/20/2023", "y" :377027},
    { "x" : "8/21/2023", "y" :292395},
    { "x" : "8/22/2023", "y" :307157},
    { "x" : "8/23/2023", "y" :209747},
    { "x" : "8/24/2023", "y" :209089},
    { "x" : "8/25/2023", "y" :414141},
    { "x" : "8/26/2023", "y" :358295},
    { "x" : "8/27/2023", "y" :374130},
    { "x" : "8/28/2023", "y" :230430},
    { "x" : "8/29/2023", "y" :333860},
    { "x" : "8/30/2023", "y" :412899},
    { "x" : "8/31/2023", "y" :417200},
    { "x" : "9/1/2023", "y" :226064},
    { "x" : "9/2/2023", "y" :248830},
    { "x" : "9/3/2023", "y" :287662},
    { "x" : "9/4/2023", "y" :320908},
    { "x" : "9/5/2023", "y" :289382},
    { "x" : "9/6/2023", "y" :249766},
    { "x" : "9/7/2023", "y" :181502},
    { "x" : "9/8/2023", "y" :199372},
    { "x" : "9/9/2023", "y" :399436},
    { "x" : "9/10/2023", "y" :328279},
    { "x" : "9/11/2023", "y" :377338},
    { "x" : "9/12/2023", "y" :306056},
    { "x" : "9/13/2023", "y" :257586},
    { "x" : "9/14/2023", "y" :409316},
    { "x" : "9/15/2023", "y" :292373},
    { "x" : "9/16/2023", "y" :292337},
    { "x" : "9/17/2023", "y" :283538},
    { "x" : "9/18/2023", "y" :432966},
    { "x" : "9/19/2023", "y" :399688},
    { "x" : "9/20/2023", "y" :211157},
    { "x" : "9/21/2023", "y" :243712},
    { "x" : "9/22/2023", "y" :219702},
    { "x" : "9/23/2023", "y" :309100},
    { "x" : "9/24/2023", "y" :448791},
    { "x" : "9/25/2023", "y" :317233},
    { "x" : "9/26/2023", "y" :297179},
    { "x" : "9/27/2023", "y" :369730},
    { "x" : "9/28/2023", "y" :341497},
    { "x" : "9/29/2023", "y" :196527},
    { "x" : "9/30/2023", "y" :245088},
    { "x" : "10/1/2023", "y" :340648}]
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
