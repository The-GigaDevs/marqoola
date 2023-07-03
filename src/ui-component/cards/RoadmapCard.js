import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

// =============================|| REVENUE CARD ||============================= //

const RoadmapCard = ({ primary, secondary, content, iconPrimary, color, title }) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <SubCard title={title} >
            <CardContent sx={{ background: color, position: 'relative', color: '#fff' }}>
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        right: 13,
                        top: 14,
                        color: '#fff',
                        '&> svg': { width: 100, height: 100, opacity: '0.5' },
                        [theme.breakpoints.down('sm')]: {
                            top: 13,
                            '&> svg': { width: 80, height: 80 }
                        }
                    }}
                >
                    {primaryIcon}
                </Typography>
                <Grid container direction={matchDownXs ? 'column' : 'row'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit" width={'60%'}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="inherit">
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </SubCard>
    );
};

RoadmapCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    content: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string,
    title:PropTypes.string
};

export default RoadmapCard;
