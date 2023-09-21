import { useTheme } from '@emotion/react';
import React from 'react'
import { gridSpacing } from 'store/constant'
import SubCard from 'ui-component/cards/SubCard';
import axios from 'utils/axios';
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
    Chip,
    TableRow,
    Typography,
    TextField,
    Button, MenuItem, Card, CardHeader, CardContent
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

function Details({ selectedIncident }) {

    const theme = useTheme();
    const dispatch = useDispatch();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '16px' }}>
                        <ConfirmationNumberOutlined style={{ marginRight: '8px' }} />
                        <Typography variant="h2" color={secondary}>
                            {selectedIncident.name}
                        </Typography>
                    </div>
                }
                >

                    <Grid container spacing={gridSpacing}>

                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Description:
                                </Typography>
                                <Typography variant="body1">{selectedIncident?.description}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Priority:
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'red' }}>{selectedIncident?.priority || 'High'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Status:
                                </Typography>
                                <Typography variant="body1">{selectedIncident?.status || 'Open'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Start Date:
                                </Typography>
                                <Typography variant="body1">{selectedIncident?.startDate || '01-01-2023'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Close Date :
                                </Typography>
                                <Typography variant="body1">{selectedIncident?.closeDate || '01-01-2023'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Responsible :
                                </Typography><Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                    <PersonIcon />
                                    Anton
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" style={{ marginRight: '16px' }}>
                                    Impact :
                                </Typography>
                                <Typography variant="body1">{'$ ' + selectedIncident?.impact || '$1,123'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </SubCard>

            </Grid>

        </Grid>
    )
}

export default Details