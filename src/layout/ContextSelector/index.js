import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, Grid, IconButton, Tooltip } from '@mui/material';
import { IconFilter } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import DivisionSelector from 'views/application/ContextSelector/division-selector';
import AssetSelector from 'views/application/ContextSelector/asset-selector';
import RiskSelector from 'views/application/ContextSelector/risk-selector';
import ObjectiveSelector from 'views/application/ContextSelector/objective-selector';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Context Selector">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '50%',
                        position: 'fixed',
                        right: 10,
                        zIndex: 1200,
                        boxShadow: theme.customShadows.secondary
                    }}
                >
                    <AnimateButton type="scale">
                        <IconButton color="inherit" size="large" children="" disableRipple aria-label="live customize">
                            <IconFilter />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                {open && (
                    <PerfectScrollbar component="div">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                {/* layout type */}
                                <DivisionSelector />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Theme Preset Color */}
                               <AssetSelector/>
                            </Grid>
                            <Grid item xs={12}>
                                {/* font family */}
                                <RiskSelector />
                            </Grid>
                            <Grid item xs={12}>
                                <ObjectiveSelector />
                                
                            </Grid>
                            <Grid item xs={12}>
                                {/* filled with outline textfield */}
                                
                            </Grid>
                            <Grid item xs={12}>
                                {/* box container */}
                                
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                )}
            </Drawer>
        </>
    );
};

export default Customization;
