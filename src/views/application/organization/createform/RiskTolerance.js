import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Button,Slider, MenuItem, FormControlLabel, Grid, Stack, TextField, Typography, Box } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import {ButtonGroup, ButtonGroupCustom} from 'ui-component/button-group'

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import ThresholdSlider from './ThresholdSlider';
import SummaryCard from './SummaryCard';



// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export default function RiskTolerance({ riskToleranceData, setRiskToleranceData, handleNext, handleBack, setErrorIndex, parentData }) {
    const [sliderData, setSliderData] = useState({});
    const [buttonGroupData, setButtonGroupData] = useState({});

    //console.log(sliderData);
    const formik = useFormik({
        initialValues: {
            
        },
        onSubmit: (values) => {
            setRiskToleranceData({
                sliderData: sliderData,
                riskClassification: buttonGroupData
            });
            handleNext();
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Select an entity risk classification</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <ButtonGroupCustom buttonGroupData={buttonGroupData} setButtonGroupData={setButtonGroupData}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">We will consider all potentials options and prioritise the most likely ones to result in success while also providing an acceptable level of rewards.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">What is your tolerable level for risk?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ThresholdSlider sliderData={sliderData} setSliderData={setSliderData}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SummaryCard />
                    </Grid>
                    
                    <Grid item xs={12} sx={{textAlign:'center'}}>
                        <Typography variant="h5" color={'red'}>The tolerable amount exceeds the recommended limit for OPEN classification.</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Typography variant="h6" color={'#808080'} sx={{textAlign:'center'}}>Transfer to cyber insurance coming soon.</Typography>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>
                            <AnimateButton>
                                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(3)}>
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

RiskTolerance.propTypes = {
    paymentData: PropTypes.object,
    setPaymentData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};
