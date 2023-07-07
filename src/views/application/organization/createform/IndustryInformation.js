import PropTypes from 'prop-types';
import { useRef } from 'react';
// material-ui
import { Button, MenuItem, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';



// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function IndustryInformation({ industryInformationData, setIndustryInformationData, handleNext, handleBack, setErrorIndex, parentData, industries, subindustries }) {
    
       

    const formik = useFormik({
        initialValues: {
            industry: industryInformationData.industry,
            subIndustry: industryInformationData.subIndustry
        },
        onSubmit: (values) => {
            setIndustryInformationData({
                industry: values.industry,
                subIndustry: values.subIndustry,
                numCustomers: values.numCustomers
            });
            handleNext();
        }
    });

    var subIndustriesFiltered = subindustries.filter(function (el) {
        return el.industryid == formik.values.industry;
      });


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            id="industry"
                            name="industry"
                            defaultValue="1"
                            value={formik.values.industry}
                            onChange={formik.handleChange}
                            error={formik.touched.industry && Boolean(formik.errors.industry)}
                            helperText={formik.touched.industry && formik.errors.industry}
                            label="Industry"
                            fullWidth
                            select
                        >
                            
                            {industries && industries.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="subIndustry"
                            name="subIndustry"
                            label="Sub-Industry"
                            value={formik.values.subIndustry}
                            onChange={formik.handleChange}
                            error={formik.touched.subIndustry && Boolean(formik.errors.subIndustry)}
                            helperText={formik.touched.subIndustry && formik.errors.subIndustry}
                            fullWidth
                            select
                        >
                             {
                             
                             subIndustriesFiltered && subIndustriesFiltered.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="numCustomers"
                            name="numCustomers"
                            label="Number of Customers"
                            value={formik.values.numCustomers}
                            onChange={formik.handleChange}
                            error={formik.touched.numCustomers && Boolean(formik.errors.numCustomers)}
                            helperText={formik.touched.numCustomers && formik.errors.numCustomers}
                            fullWidth
                        >
                             
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(2)}>
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
    industryInformationData: PropTypes.object,
    setIndustryInformationData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};
