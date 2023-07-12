import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { getCurrencies } from 'store/slices/currency';

// material-ui
import { Button, MenuItem, Grid, Stack, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({ 
   
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const AssetDetails = ({ assetDetailsData, setAssetDetailsData, handleNext, setErrorIndex, parentData }) => {
    const dispatch = useDispatch();
    const [currencyData, setCurrencyData] = useState([]);
    const { currencies } = useSelector((state) => state.currency);

    useEffect(() => {
        dispatch(getCurrencies());
    }, []);

    useEffect(() => {
        setCurrencyData(currencies);
    }, [currencies]);

    const formik = useFormik({
        initialValues: {
            
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            setAssetDetailsData({
                intrinsicassetvalue: {number: values.intrinsicassetvaluenumber, currency: values.intrinsicassetvaluecurrency},
                indirectassetvalue: {number: values.indirectassetvaluenumber, currency: values.indirectassetvaluecurrency},
                directassetvalue: {number: values.directassetvaluenumber, currency: values.directassetvaluecurrency},
            });
            handleNext();
            helpers.resetForm()
        }
    });
    
    return (
        <>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={9} >
                        <TextField
                            id="intrinsicassetvaluenumber"
                            name="intrinsicassetvaluenumber"
                            label="Intrinsic Asset Value"
                            value={formik.values.intrinsicassetvaluenumber}
                            onChange={formik.handleChange}
                            error={formik.touched.intrinsicassetvaluenumber && Boolean(formik.errors.intrinsicassetvaluenumber)}
                            helperText={formik.touched.intrinsicassetvaluenumber && formik.errors.intrinsicassetvaluenumber}
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            id="intrinsicassetvaluecurrency"
                            name="intrinsicassetvaluecurrency"
                            label="Currency"
                            value={formik.values.intrinsicassetvaluecurrency}
                            onChange={formik.handleChange}
                            error={formik.touched.intrinsicassetvaluecurrency && Boolean(formik.errors.intrinsicassetvaluecurrency)}
                            helperText={formik.touched.intrinsicassetvaluecurrency && formik.errors.intrinsicassetvaluecurrency}
                            fullWidth
                            select
                        >
                             {
                             
                             currencyData && currencyData.map((parent) => (
                                        <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                            {parent.Alpha}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={9} >
                        <TextField
                            id="indirectassetvaluenumber"
                            name="indirectassetvaluenumber"
                            label="Indirect Asset Value"
                            value={formik.values.indirectassetvaluenumber}
                            onChange={formik.handleChange}
                            error={formik.touched.indirectassetvaluenumber && Boolean(formik.errors.indirectassetvaluenumber)}
                            helperText={formik.touched.indirectassetvaluenumber && formik.errors.indirectassetvaluenumber}
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            id="indirectassetvaluecurrency"
                            name="indirectassetvaluecurrency"
                            label="Currency"
                            value={formik.values.indirectassetvaluecurrency}
                            onChange={formik.handleChange}
                            error={formik.touched.indirectassetvaluecurrency && Boolean(formik.errors.indirectassetvaluecurrency)}
                            helperText={formik.touched.indirectassetvaluecurrency && formik.errors.indirectassetvaluecurrency}
                            fullWidth
                            select
                        >
                             {
                             
                             currencyData && currencyData.map((parent) => (
                                        <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                            {parent.Alpha}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={9} >
                        <TextField
                            id="directassetvaluenumber"
                            name="directassetvaluenumber"
                            label="Direct Asset Value"
                            value={formik.values.directassetvaluenumber}
                            onChange={formik.handleChange}
                            error={formik.touched.directassetvaluenumber && Boolean(formik.errors.directassetvaluenumber)}
                            helperText={formik.touched.directassetvaluenumber && formik.errors.directassetvaluenumber}
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            id="directassetvaluecurrency"
                            name="directassetvaluecurrency"
                            label="Currency"
                            value={formik.values.directassetvaluecurrency}
                            onChange={formik.handleChange}
                            error={formik.touched.directassetvaluecurrency && Boolean(formik.errors.directassetvaluecurrency)}
                            helperText={formik.touched.directassetvaluecurrency && formik.errors.directassetvaluecurrency}
                            fullWidth
                            select
                        >
                             {
                             
                             currencyData && currencyData.map((parent) => (
                                        <MenuItem key={parent.Alpha} value={parent.Alpha}>
                                            {parent.Alpha}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(1)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

AssetDetails.propTypes = {
    assetDetailsData: PropTypes.object,
    setAssetDetailsData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default AssetDetails;
