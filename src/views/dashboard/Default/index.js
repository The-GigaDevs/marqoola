import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import axios from 'utils/axios';
import { Grid, Tab, Tabs, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import RiskProgressChart from './RiskProgressChart';
import { gridSpacing } from 'store/constant';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import RiskDashboardControlTable from 'views/forms/tables/RiskDashboardControlTable';
import ReportCard from 'ui-component/cards/ReportCard';
import CurrentRiskCard from 'ui-component/cards/CurrentRiskCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const tabsOption = [
    {
        label: 'Dashboard',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Test Lists',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Vendors',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Marketplace',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

const detailTabsOption = [
    {
        label: 'Controls',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Overview',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Stats',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Analysis',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'News',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

function UserList() {

};




// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get('/risks?limit=1');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);

    const orange = theme.palette.orange.main;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDetailChange = (event, newValue) => {
        setValue1(newValue);
    };

    return (

        <Grid title="Account" container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    sx={{
                        mb: 3,
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: theme.palette.grey[600],
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected': {
                            color: theme.palette.primary.main
                        },
                        '& .MuiTabs-indicator': {
                            bottom: 2
                        },
                        '& a > svg': {
                            marginBottom: '0px !important',
                            mr: 1.25
                        }
                    }}
                >
                    {tabsOption.map((tab, index) => (
                        <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
                <Typography variant="h2">Control Library</Typography>
                <Typography variant="h1">Data Breach (Malicious External)</Typography>
                <Typography variant="title" color="inherit" noWrap>&nbsp;</Typography>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
                            <Box
                                sx={{
                                    p: 3
                                }}
                            >
                                <Grid container direction="column" spacing={3}>
                                    <Grid item>
                                        <Typography variant="h3">Performance</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="row" spacing={1}>
                                            <Grid item>
                                                <ArrowUpwardIcon color='orange' />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h4" color={orange}>58,4%</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h4" color='grey'>Last year</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <RiskProgressChart isLoading={isLoading} /></Box>
                            <Grid container direction="row" spacing={1} style={{ paddingLeft: '100px', paddingBottom: '20px' }}>
                                <Grid item xs={2.4}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h2" color="inherit">
                                                12,38%
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4" color="grey">
                                                Of total risk
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h2" color="inherit">
                                                1
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4" color="grey">
                                                Frequency
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h2" color="inherit">
                                                5%
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4" color="grey">
                                                Probability
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h2" color="inherit">
                                                15
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4" color="grey">
                                                Controls
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h2" color="inherit">
                                                172
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h4" color="grey">
                                                Tests
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <div style={{ paddingBottom: '25px' }}><CurrentRiskCard secondary='58,3%' icon={ArrowUpwardIcon} primary='Data Breach (Malicious External)' color='orange' amount='A$ 1,981.132'></CurrentRiskCard></div>
                        <ReportCard primary='About Data Breach (Malicious External)' secondary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet nulla sit amet est auctor ornare. Duis tellus lacus, consequat condimentum odio sit amet, finibus lacinia nisi. Aenean sit amet mollis enim. Nunc a dui purus. In a mauris fermentum, posuere ante sit amet, vulputate diam. Morbi cursus, mauris eget feugiat semper, ipsum enim mattis libero, feugiat gravida risus ante malesuada diam. Donec id metus interdum, volutpat ligula nec, fermentum augue. Pellentesque imperdiet consequat metus, in aliquet velit mattis et. Aliquam id purus at nibh aliquam lobortis vitae cursus augue. Suspendisse ac odio porta, imperdiet urna auctor, interdum tortor. In eget vestibulum sapien, nec elementum urna.' isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Tabs
                    value={value1}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleDetailChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    sx={{
                        mb: 3,
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: theme.palette.grey[600],
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected': {
                            color: theme.palette.primary.main
                        },
                        '& .MuiTabs-indicator': {
                            bottom: 2
                        },
                        '& a > svg': {
                            marginBottom: '0px !important',
                            mr: 1.25
                        }
                    }}
                >
                    {detailTabsOption.map((tab, index) => (
                        <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <RiskDashboardControlTable />
                    </Grid>

                </Grid>
            </Grid>

        </Grid>

    );
};

export default Dashboard;
