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
import { Icon360 } from '@tabler/icons';


const Roadmap = () => {
    const theme = useTheme();

    return (
        <MainCard title="Roadmap" content={false}>
            <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={5} >
                <RoadmapCard
                    secondary="Create your own risk categories"
                    content="Add/Modify/Delete"
                    iconPrimary={MonetizationOnTwoToneIcon}
                    color={theme.palette.secondary.main}
                    title="Create Risk Categories"
                />
            </Grid>
            <Grid item xs={5}>
                <RoadmapCard
                    secondary="Create your own risks"
                    content="Add/Modify/Delete"
                    iconPrimary={Icon360}
                    color={theme.palette.primary.main}
                    title="Create Risks"
                />
            </Grid>
            </Grid>
                
            </CardContent>

           
            
        </MainCard>
        
    );
};

export default Roadmap;
