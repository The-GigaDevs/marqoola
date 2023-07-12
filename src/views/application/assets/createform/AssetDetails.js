import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { getOrganisations } from 'store/slices/organisation';

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
    const [organisationData, setOrganisationData] = useState([]);
    const { organisations } = useSelector((state) => state.organisation);

    useEffect(() => {
        dispatch(getOrganisations());
    }, []);

    useEffect(() => {
        setOrganisationData(organisations);
    }, [organisations]);

    const formik = useFormik({
        initialValues: {
            
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            setAssetDetailsData({
                intrinsicassetvalue:{number:values.intrinsicassetvaluenumber, currency: values.intrinsicassetvaluecurrency},
                indirectassetvalue: {number:values.indirectassetvaluenumber, currency: values.indirectassetvaluecurrency},
                parent: values.parent,
                organisation: values.organisation
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
                             
                             parentData && parentData.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            id="organisation"
                            name="organisation"
                            label="Organisation"
                            value={formik.values.organisation}
                            onChange={formik.handleChange}
                            error={formik.touched.organisation && Boolean(formik.errors.organisation)}
                            helperText={formik.touched.organisation && formik.errors.organisation}
                            fullWidth
                            select
                        >
                             {
                             
                             organisationData && organisationData.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description *"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            fullWidth
                            multiline
                            rows={3}
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
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
    basicInformationData: PropTypes.object,
    setBasicInformationData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default AssetDetails;
