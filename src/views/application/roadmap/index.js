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
import { Icon360, Icon3dCubeSphere, Icon123 } from '@tabler/icons';
import SubCard from 'ui-component/cards/SubCard';


const Roadmap = () => {
    const theme = useTheme();

    return (
        <MainCard title="Roadmap" content={false}>
            <CardContent>
                <Grid container spacing={3} >
                    <Grid item xs={12}  >
                        <SubCard title="Now"  >
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
                        </SubCard>
                        <br />
                    
                        <SubCard title="Later">
                            <Grid container spacing={3}>
                                <Grid item xs={5} >
                                    <RoadmapCard
                                        secondary="Create your own assets"
                                        content="Add/Modify/Delete"
                                        iconPrimary={Icon3dCubeSphere}
                                        color={theme.palette.orange.dark}
                                        title="Create Assets"
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <RoadmapCard
                                        secondary="Create your own control tests"
                                        content="Add/Modify/Delete"
                                        iconPrimary={Icon123}
                                        color={theme.palette.warning.dark}
                                        title="Create Control Tests"
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </CardContent>



        </MainCard>

    );
};

export default Roadmap;
