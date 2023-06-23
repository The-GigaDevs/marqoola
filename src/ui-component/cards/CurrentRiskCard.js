import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';

// ==============================|| REPORT CARD ||============================== //

const CurrentRiskCard = ({ primary, secondary, amount, color, color2, icon }) => {

    const IconPrimary = icon;
    const primaryIcon = icon !== undefined ? <IconPrimary fontSize="large" sx={{ width: 14, height: 14, color }} /> : null;
    
    return (
        <MainCard>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={7}>
                    <Stack spacing={1}>
                        <Typography variant="h4">{primary}</Typography>
                        <Typography variant="h4">Risk scenario</Typography>
                        <Typography variant="title" color="inherit" noWrap>&nbsp;</Typography>
                        <Typography variant="h5">Current Risk</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={5} style={{ paddingTop: '100px'}}>
                    <Stack>
                    <Typography variant="h3" style={{ color }}>
                        {amount}
                    </Typography>
                    </Stack>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h5" style={{ color }}>
                               {primaryIcon} {secondary} 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" style={{ color2 }}>
                                &nbsp;Last year
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

CurrentRiskCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    amount: PropTypes.string,
    color: PropTypes.string,
    color2: PropTypes.string,
    icon: PropTypes.object
};

export default CurrentRiskCard;
