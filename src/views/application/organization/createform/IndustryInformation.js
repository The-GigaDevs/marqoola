import PropTypes from 'prop-types';

// material-ui
import { Button, MenuItem, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object({
    numEmployees: yup.string().required('First Name is required'),
    revenue: yup.string().required('Last Name is required')
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function IndustryInformation({ paymentData, setPaymentData, handleNext, handleBack, setErrorIndex, parentData }) {
    

    const formik = useFormik({
        initialValues: {
            numEmployees: paymentData.numEmployees,
            revenue: paymentData.revenue
        },
        validationSchema,
        onSubmit: (values) => {
            setPaymentData({
                numEmployees: values.numEmployees,
                revenue: values.revenue
            });
            handleNext();
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="numEmployees"
                            name="numEmployees"
                            value={formik.values.numEmployees}
                            onChange={formik.handleChange}
                            error={formik.touched.numEmployees && Boolean(formik.errors.numEmployees)}
                            helperText={formik.touched.numEmployees && formik.errors.numEmployees}
                            label="Number of employees"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="revenue"
                            name="revenue"
                            label="Annual revenue"
                            value={formik.values.revenue}
                            onChange={formik.handleChange}
                            error={formik.touched.revenue && Boolean(formik.errors.revenue)}
                            helperText={formik.touched.revenue && formik.errors.revenue}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="currency"
                            name="currency"
                            label="Currency"
                            value={formik.values.currency}
                            onChange={formik.handleChange}
                            error={formik.touched.currency && Boolean(formik.errors.currency)}
                            helperText={formik.touched.currency && formik.errors.currency}
                            fullWidth
                        >
                             {parentData && parentData.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

IndustryInformation.propTypes = {
    paymentData: PropTypes.object,
    setPaymentData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};
