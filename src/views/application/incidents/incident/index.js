import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { getIncidentById } from 'store/slices/incident';
import Details from './Details';
import Risks from './Risks';
import Controls from './Controls';
import AuditLogs from './AuditLogs';

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

const IncidentDetail = () => {
    const theme = useTheme();
    const { id } = useParams();

    const dispatch = useDispatch();
    const { user } = useAuth();
    const { selectedIncident } = useSelector((state) => state.incident);
    // set selected tab
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getIncidentById(id, user.accessToken));
    }, [dispatch, id, user?.accessToken]);


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
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Details" {...a11yProps(0)} />
                <Tab icon={<ReportProblemOutlinedIcon />} component={Link} to="#" label="Risks" {...a11yProps(1)} />
                <Tab icon={<SportsEsportsOutlinedIcon />} component={Link} to="#" label="Controls" {...a11yProps(2)} />
                <Tab icon={<DescriptionOutlinedIcon />} component={Link} to="#" label="Audit Log" {...a11yProps(3)} />

            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Details selectedIncident={selectedIncident} />
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <Risks selectedIncident={selectedIncident} />
            </TabPanel>

            {/* tab - status */}
            <TabPanel value={value} index={2}>
                <Controls selectedIncident={selectedIncident} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AuditLogs selectedIncident={selectedIncident} />
            </TabPanel>

        </MainCard>
    );
};

export default IncidentDetail;
