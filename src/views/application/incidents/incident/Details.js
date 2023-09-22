import { useTheme } from '@emotion/react';
import React from 'react'
import { gridSpacing } from 'store/constant'
import SubCard from 'ui-component/cards/SubCard';
import {
    Grid,

    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';



function Details({ selectedIncident }) {

    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '16px' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', }}>
                            <ConfirmationNumberOutlined style={{ marginRight: '8px' }} />
                            <Typography variant="h2" color={secondary}>
                                {selectedIncident.name || 'Data Over-retention'}
                            </Typography>
                        </Box>
                        <Button variant="contained">Save</Button>
                    </Box>
                }
                >

                    <Grid container spacing={gridSpacing}>

                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Description:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.description}
                                // onChange={handleDescriptionChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Priority:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.priority || 'High'}
                                // onChange={handleDescriptionChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Status:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.status || 'Open'}
                                // onChange={handleDescriptionChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Start Date:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.startDate || '29-9-2023'}
                                // onChange={handleDescriptionChange}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Close Date :
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.endDate || '29-9-2023'}
                                // onChange={handleDescriptionChange}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Responsible :
                                </Typography>
                                <Grid item xs={2}>
                                    <Select
                                        id="demo-multiple-chip"
                                        fullWidth
                                        // value={personName}
                                        // onChange={handleTagSelectChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                                <PersonIcon />
                                                Anton
                                            </Box>
                                        )}
                                    >
                                        <MenuItem >
                                            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                                <PersonIcon />
                                                Anton
                                            </Box>
                                        </MenuItem>
                                        <MenuItem >
                                            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                                <PersonIcon />
                                                Anton
                                            </Box>
                                        </MenuItem>
                                        <MenuItem >
                                            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                                <PersonIcon />
                                                Anton
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Impact :
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    // fullWidth
                                    value={selectedIncident?.impact}
                                    type='number'
                                // onChange={handleDescriptionChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </SubCard>

            </Grid>

        </Grid>
    )
}

export default Details