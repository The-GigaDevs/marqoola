import * as React from 'react';

// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import RoadmapCard from 'ui-component/cards/RoadmapCard';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';


const OrganizationList = () => {
    const theme = useTheme();

    return (
        <MainCard title="Roadmap" content={false}>
            <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={12} lg={4} md={12}>
                <RoadmapCard
                    primary="Revenue"
                    secondary="$42,562"
                    content="$50,032 Last Month"
                    iconPrimary={MonetizationOnTwoToneIcon}
                    color={theme.palette.secondary.main}
                />
            </Grid>
            </Grid>
                
            </CardContent>

           
            
        </MainCard>
        
    );
};

export default OrganizationList;
