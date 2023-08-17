import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { getOrganisations } from 'store/slices/organisation';
import { getAssetTypes } from 'store/slices/assettype';

// material-ui
import { Button, MenuItem, Grid, Stack, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Asset name is required'),
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const BasicInformation = ({ basicInformationData, setBasicInformationData, handleNext, setErrorIndex, parentData }) => {
    const dispatch = useDispatch();
    const [organisationData, setOrganisationData] = useState([]);
    const { organisations } = useSelector((state) => state.organisation);
    const { assettypes } = useSelector((state) => state.assettype);

    useEffect(() => {
        dispatch(getOrganisations());
        dispatch(getAssetTypes());
    }, []);

    useEffect(() => {
        setOrganisationData(organisations);
    }, [organisations]);

    const formik = useFormik({
        initialValues: {
            
        },
        validationSchema,
        onSubmit: (values, helpers) => {
            setBasicInformationData({
                name: values.name,
                description: values.description,
                parent: values.parent,
                organisation: values.organisation,
                assettype: values.assettype
            });
            handleNext();
            helpers.resetForm()
        }
    });
    
    return (
        <>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={6} >
                        <TextField
                            id="name"
                            name="name"
                            label="Name of Asset"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                           
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            id="parent"
                            name="parent"
                            label="Parent Asset"
                            value={formik.values.parent}
                            onChange={formik.handleChange}
                            error={formik.touched.parent && Boolean(formik.errors.parent)}
                            helperText={formik.touched.parent && formik.errors.parent}
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
                    <Grid item xs={6}>
                    <TextField
                            id="assettype"
                            name="assettype"
                            label="Type"
                            value={formik.values.assettype}
                            onChange={formik.handleChange}
                            error={formik.touched.assettype && Boolean(formik.errors.assettype)}
                            helperText={formik.touched.assettype && formik.errors.assettype}
                            fullWidth
                            select
                        >
                             {
                             
                             assettypes && assettypes.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.label}
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

BasicInformation.propTypes = {
    basicInformationData: PropTypes.object,
    setBasicInformationData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default BasicInformation;
