import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Rating, TextField, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// review state options
const reviewState = [
    {
        value: '1',
        label: 'Published'
    },
    {
        value: '2',
        label: 'Pending'
    },
    {
        value: '3',
        label: 'confirm'
    }
];

const NewSecurityConcept = ({ open, handleCloseDialog }) => {
    // handle review status change
    const [currency, setCurrency] = useState('1');
    const handleSelectChange = (event) => {
        setCurrency(event.target.value);
    };

    // handle star rating
    const [value, setValue] = useState(2);

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 800
                    }
                }
            }}
        >
            {open && (
                <>
                    <DialogTitle>Create Security Concept</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ my: 0 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic-review-product"
                                    fullWidth
                                    label="CSF2.0 Function"
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic-review-author" fullWidth label="CSF2.0 Function "  />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic-review"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Description"
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic-review-author" fullWidth label="Impact Ratio "  />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic-review-author" fullWidth label="Abbreviation "  />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained">Create</Button>
                        </AnimateButton>
                        <Button variant="text" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

NewSecurityConcept.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default NewSecurityConcept;
