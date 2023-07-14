import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'utils/axios'

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, IconButton, List, ListItem, ListItemText, ListItemAvatar, Stack, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
// third party icons

import OrganizationIcon from './OrganizationIcon';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import OrganizationAddWithParent from './OrganizationAddWithParent';
import OrganizationModify from './OrganizationModify';

import { useDispatch, useSelector } from 'store';

import { deleteOrganisation } from 'store/slices/organisation';

// ==============================|| DATACARD ORGANIZATION CHART ||============================== //

function DataCard({ name, role, id, linkedin, meet, skype, root, rows }) {
    const dispatch = useDispatch();
    const { organisations } = useSelector((state) => state.organisation);

    const [open, setOpen] = React.useState(false);
    const [openM, setOpenM] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleClickOpenDialogM = () => {
        setOpenM(true);
    };
    const handleClickOpenEditDialog = () =>{
        setOpenM(true);
    }
    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleCloseDialogM = () => {
        setOpenM(false);
    };

    const handleDelete = () => {
        dispatch(deleteOrganisation(id));
    };
    
    const linkHandler = (link) => {
        window.open(link);
    };
    const theme = useTheme();

    const subTree = theme.palette.mode === 'dark' ? `dark.800` : `grey.100`;
    const rootTree = theme.palette.mode === 'dark' ? `dark.900` : `secondary.light`;

    const [orgData, setOrgData] = React.useState([]);
    var aaa;


    const getOrgData = React.useCallback(async () => {
        try {
            const response = await axios.get('/objects/organisations/'+ id);
            setOrgData(response.data);
            aaa = response.data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    React.useEffect(() => {
        getOrgData();
    }, [getOrgData]);

    return (
        <MainCard
            sx={{
                bgcolor: root ? rootTree : subTree,
                border: root ? `1px solid ${theme.palette.primary.main}` : `1px solid${theme.palette.secondary.main}`,
                width: 'max-content',
                m: '0px auto'
            }}
            content={false}
        >
            <List sx={{ width: '100%', border: 'transparent', p: 1.5 }}>
                <ListItem sx={{ p: 0, alignItems: 'flex-start' }}>
                    <ListItemAvatar>
                        <OrganizationIcon />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ m: 0 }}
                        primary={
                            <Typography variant="subtitle1" sx={{ color: root ? `primary.dark` : `secondary.dark` }}>
                                {name}
                            </Typography>
                        }
                    />
                </ListItem>
                <Stack spacing={2} sx={{ pl: 7, mt: -0.5 }}>
                    <Box sx={{ display: 'flex' }}>
                        {!root && (
                            <Chip
                                label={role}
                                sx={{ fontSize: '0.625rem', height: 20, '& .MuiChip-label': { px: 0.75 } }}
                                color="primary"
                                variant="outlined"
                                size="small"
                            />
                        )}
                        {root && (
                            <Typography sx={{ color: `secondary.dark` }} variant="caption">
                                {role}
                            </Typography>
                        )}
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                            size="small"
                            onClick={handleClickOpenDialog}
                            sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'background.paper', borderRadius: 3, p: 0.25 }}
                        >
                           <AddIcon fontSize="small" />
                           
                            <OrganizationAddWithParent open={open} parent={{id: id, name:name}} handleCloseDialog={handleCloseDialog} />
                        </IconButton>
                        <IconButton
                            onClick={handleClickOpenEditDialog}
                            size="small"
                            sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'background.paper', borderRadius: 3, p: 0.25 }}
                        >
                            <EditIcon fontSize='small'  />
                            <OrganizationModify open={openM} parents={rows} orgId={orgData} handleCloseDialog={handleCloseDialogM} />
                            
                        </IconButton>
                        <IconButton size='small' sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'background.paper', borderRadius: 3, p: 0.25 }}
                        >
                            <Delete fontSize='small'  onClick={handleDelete} />
                        </IconButton>

                        
                    </Stack>
                </Stack>
            </List>
        </MainCard>
    );
}

DataCard.propTypes = {
    name: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.string,
    linkedin: PropTypes.string,
    meet: PropTypes.string,
    skype: PropTypes.string,
    root: PropTypes.bool,
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    rows: PropTypes.object
};

export default DataCard;
