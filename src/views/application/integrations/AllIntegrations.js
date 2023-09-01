// material-ui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Avatar,
    Typography,
    TextField,
    Button, MenuItem, Card, CardHeader, CardContent, Switch
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';

const avatarImage = require.context('assets/images/integrations', true);

const sxDivider = {
    borderColor: 'primary.light'
};

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};


const AllIntegrations = () => {
    const theme = useTheme();
    const { scenariometrics, selectedControlScenario } = useSelector((state) => state.control);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const { user } = useAuth();
    const avatarProfile = avatarImage(`./27.VMWare.png`);
    useEffect(() => {

    }, []);



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


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={<><Typography variant="h2" color={secondary}>Integrations </Typography>

                </>}
                >
                    <SubCard title="Operating Systems">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack direction="row" spacing={1}>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            height: '400px',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./01.independentLinux.png`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Indepentent Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Independent Linux distributions, often referred to as <br />"indie" distributions, are Linux operating systems that are<br /> developed and maintained by a small group of <br />enthusiasts or independent developers.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./02.WindowsDesktop.png`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Windows Desktop
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Windows Desktop is a graphical user interface (GUI) provided by Microsoft for its Windows operating system, offering a familiar and user-friendly environment for interacting with a computer.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./03.DebianLinux.png`)} height='60px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Debian Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Debian Linux is a free and open-source operating system known for its stability and commitment to software freedom, providing a versatile platform for a wide range of computing needs.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./04.Ubuntu.png`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Ubuntu
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Ubuntu Linux is a popular and user-friendly open-source operating system based on Debian, known for its ease of use and extensive software support, making it suitable for both desktop and server environments.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>

                            </Stack>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>

                        
                    </Grid>
                    <br/><br/>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack direction="row" spacing={1}>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            height: '400px',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./05.AmazonLinux.png`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Amazon Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Amazon Linux is a Linux distribution developed by Amazon Web Services (AWS) specifically for use in the AWS cloud environment, designed for seamless integration with AWS services and optimized for cloud-based applications and workloads.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./06.CentosLinux.jpg`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            CentOS Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            CentOS Linux is a free, open-source, community-driven operating system that serves as a downstream, binary-compatible version of Red Hat Enterprise Linux (RHEL), providing a stable and reliable platform for server deployments.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./07.OracleLinux.jpg`)} height='60px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Oracle Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Oracle Linux is an enterprise-grade, open-source Linux distribution developed and supported by Oracle, designed to provide a highly optimized and secure platform for running Oracle software and other business-critical applications.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>
                                <Grid item sx={{ width: 1 / 4 }}>
                                    <Card
                                        sx={{
                                            p: 2,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                            border: '1px solid',
                                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                                            '&:hover': {
                                                border: `1px solid${theme.palette.primary.main}`
                                            }
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item>
                                                        <img src={avatarImage(`./08.RedHatLinux.png`)} height='50px' />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            variant="h4"
                                                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                                                        >
                                                            Red Hat Linux
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', display: 'block' }}
                                                        >
                                                            <PinDropTwoToneIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem', verticalAlign: 'text-top' }} />
                                                            Red Hat Linux, now known as Red Hat Enterprise Linux (RHEL), is a commercially supported open-source operating system designed for enterprise environments, offering a secure, stable, and scalable platform with long-term support.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch />
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <SubCard >
                                            View Integration
                                        </SubCard>
                                    </Card>
                                </Grid>

                            </Stack>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>

                        
                    </Grid>

                    </SubCard>
                </SubCard>
            </Grid>

        </Grid>
    );
};

export default AllIntegrations;
