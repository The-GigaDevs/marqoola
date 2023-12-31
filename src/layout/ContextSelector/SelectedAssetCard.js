import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, IconButton } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { useNavigate } from 'react-router-dom';
import { IconAsset } from '@tabler/icons';
import { IconX } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { setAssetSelector } from 'store/slices/asset-selector';
// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const SelectedAssetCard = () => {
    const theme = useTheme();
    const { selectedAssetData, selectedAsset } = useSelector((state) => state.assetselector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const handleOpenEditDialog = (event, id) => {
        navigate('/asset', { state: { id: id } });
    }

    return (
        <>

            <CardWrapper border={false} content={false} sx={{ marginLeft: 2 }} >
                <Box sx={{ p: 1 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor: theme.palette.primary[800],
                                        color: '#fff'
                                    }}
                                >
                                    <IconAsset fontSize="inherit" onClick={(event) => { handleOpenEditDialog(event, selectedAsset) }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    py: 0,
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                primary={
                                    <Typography variant="h4" sx={{ color: '#fff' }}>
                                        {selectedAsset.length > 1 ? selectedAssetData.name : 'All Assets'}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                        Selected Asset
                                    </Typography>
                                }
                            />
                            <IconButton
                                disableElevation
                                disableRipple
                                size="small"
                                sx={{
                                    ml: 1,
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    },
                                    color: 'primary.light', mt: -3, mr: -2, scale: '0.75'
                                }}
                                onClick={() => { dispatch(setAssetSelector('0', user.accessToken)) }}
                            >

                                <IconX />
                            </IconButton>
                        </ListItem>

                    </List>
                </Box>
            </CardWrapper>

        </>
    );
};

SelectedAssetCard.propTypes = {
    isLoading: PropTypes.bool
};

export default SelectedAssetCard;
