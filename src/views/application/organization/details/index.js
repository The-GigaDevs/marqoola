import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';


import { Box, Tab, Tabs, IconButton } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getOrganisationDetails } from 'store/slices/organisation';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import Dashboard from './Dashboard';
import Details from './Details';
import Assets from './Assets';
import ControlImplementations from './ControlImplementations';
import Risks from './Risks';
import Objectives from './Objectives';

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

const OrgDetails = ({activeTab, identifier, setOpenDetails}) => {
    const theme = useTheme();

    const {state} = useLocation();
    
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { selectedOrganisation } = useSelector((state) => state.organisation);
    // set selected tab
    const [value, setValue] = useState(0);
    const [controlid, setControlid] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const { id } = identifier;
        dispatch(getOrganisationDetails(id, user.accessToken));
        //const { activeTab } = state;
        //activeTab && setValue(activeTab);
    }, []);


    return (
        <MainCard >
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
                        mr: 2.5,
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
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Dashboard" {...a11yProps(0)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Details" {...a11yProps(1)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Assets" {...a11yProps(2)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Objectives" {...a11yProps(3)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Risks" {...a11yProps(4)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Control Implementations" {...a11yProps(5)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Incidents" {...a11yProps(6)} />
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Audit Log" {...a11yProps(7)} />
                
                    <IconButton sx={{marginLeft: 'auto'}} onClick={() => setOpenDetails(false)}>
                        <DescriptionTwoToneIcon /> Back
                    </IconButton>
                
            

                
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
               <Dashboard controlData={selectedOrganisation}/>
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <Details controlData={selectedOrganisation}/>
            </TabPanel>

            {/* tab - status */}
            <TabPanel value={value} index={2}>
                <Assets selectedOrganisation={selectedOrganisation}/>
            </TabPanel>
           
            <TabPanel value={value} index={3}>
               <Objectives selectedOrganisation={selectedOrganisation}/>
            </TabPanel>

            <TabPanel value={value} index={4}>
                <Risks selectedOrganisation={selectedOrganisation}/>
            </TabPanel>

            <TabPanel value={value} index={5}>
                <ControlImplementations selectedOrganisation={selectedOrganisation}/> 
            </TabPanel>
        </MainCard>
    );
};

export default OrgDetails;
