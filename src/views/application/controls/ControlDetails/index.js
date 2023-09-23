import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getControlById } from 'store/slices/control';

// Marqoola ICONS
import SquidsIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ComplianceIcon from '@mui/icons-material/FactCheckOutlined';
import TestsIcon from '@mui/icons-material/RuleOutlined';
import CostsIcon from '@mui/icons-material/MonetizationOnOutlined';
import IntegrationsIcon from '@mui/icons-material/CloudSyncOutlined';
import DetailsIcon from '@mui/icons-material/DescriptionOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuditLogsIcon from '@mui/icons-material/EventNoteOutlined';
import IncidentsIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ControlsIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import {IconAlertTriangle as RisksIcon}   from '@tabler/icons';
import  {IconAsset as AssetsIcon}  from '@tabler/icons';
import {IconBinaryTree as DivisionsIcon}  from '@tabler/icons';
import {IconTargetArrow as ObjectivesIcon}  from '@tabler/icons';
import DashboardIcon from '@mui/icons-material/Insights';

import Details from './Details';
import Costs from './Costs';

// tab content
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| ORDER DETAILS ||============================== //

const ControlDetails = () => {
    const theme = useTheme();
    const {state} = useLocation();
    
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { selectedControl } = useSelector((state) => state.control);
    // set selected tab
    const [value, setValue] = useState(0);
    const [controlid, setControlid] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const { id } = state;
        dispatch(getControlById(id, user.accessToken));
    }, [dispatch]);


    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
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
                    '& a > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25
                    },
                    mb: 3
                }}
            >
                <Tab icon={<DetailsIcon />} component={Link} to="#" label="Details" {...a11yProps(0)} />
                <Tab icon={<CostsIcon />} component={Link} to="#" label="Costs" {...a11yProps(1)} />
                <Tab icon={<TestsIcon />} component={Link} to="#" label="Tests" {...a11yProps(2)} />
                <Tab icon={<SquidsIcon />} component={Link} to="#" label="sQuids" {...a11yProps(3)} />
                <Tab icon={<ComplianceIcon />} component={Link} to="#" label="Compliance" {...a11yProps(4)} />
                <Tab icon={<AuditLogsIcon />} component={Link} to="#" label="Audit" {...a11yProps(5)} />
                
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
               <Details controlData={selectedControl}/>
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <Costs controlData={selectedControl}/>
            </TabPanel>

            {/* tab - status */}
            <TabPanel value={value} index={2}>
                
            </TabPanel>
           
        </MainCard>
    );
};

export default ControlDetails;
