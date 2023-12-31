import React from 'react';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography , Dialog} from '@mui/material';

// project imports
import BasicInformation from './BasicInformation';
import AssetDetails from './AssetDetails';
import Review from './Review'
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';



// step options
const steps = ['Basic information', 'Asset details', 'Review'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, basicInformationData, setBasicInformationData, assetDetailsData, setAssetDetailsData, parentData, currencies) => {
    switch (step) {
        case 0:
            return (
                <BasicInformation
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    basicInformationData={basicInformationData}
                    setBasicInformationData={setBasicInformationData}
                    parentData={parentData}
                />
            );
        case 1:
            return (
                <AssetDetails
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    assetDetailsData={assetDetailsData}
                    setAssetDetailsData={setAssetDetailsData}
                    parentData={parentData}
                    currencies={currencies}
                />
            );
        case 2:
            return (
                <Review basicInformationData={basicInformationData} assetDetailsData={assetDetailsData}/>
            );
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const AssetCreateForm = ({ open, handleCloseDialog, resetForm, setResetForm, parentData, currencies, industries , subindustries}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [basicInformationData, setBasicInformationData] = React.useState({});
    const [assetDetailsData, setAssetDetailsData] = React.useState({});
     const [errorIndex, setErrorIndex] = React.useState(null);
     const { user } = useAuth();
    const [resetFormData, setResetFormData] = React.useState(false);

    

    const handleResetData = () => {
        setResetFormData(resetForm)
        setActiveStep(0);
    }
    

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    React.useEffect(() => {
        if (open == false)
        {
            setActiveStep(0);
            setBasicInformationData({});
            setAssetDetailsData({});
        }
    }, [open]);
    
    
    const handleSaveAsset = async () => {
        
        try {
            const headers = {
                Authorization: `Bearer ` + user.accessToken
            };
            const response =  await axios.post('/objects/assets', {name: basicInformationData.name,
                indirectassetvalue: {number:parseInt(assetDetailsData.indirectassetvalue.number),currency:assetDetailsData.indirectassetvalue.currency}, 
                directassetvalue: {number:parseInt(assetDetailsData.directassetvalue.number),currency:assetDetailsData.directassetvalue.currency}, 
            parentid: basicInformationData.parent,
            orgaid: basicInformationData.organisation,
            assettypeid: basicInformationData.assettype,
            data: {
                description: basicInformationData.description,
                title: basicInformationData.name,
                
            }}, {headers}).then(handleCloseDialog);
        } catch (error) {
            console.log('Could not save asset:', error)
            handleCloseDialog();
        }
    
}

    return ( <Dialog
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
        <MainCard title="Create Asset">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        
                        <Review
                        />
                    </>
                ) : (
                    <>
                        {getStepContent(
                            activeStep,
                            handleNext,
                            handleBack,
                            setErrorIndex,
                            basicInformationData, setBasicInformationData,
                            assetDetailsData, setAssetDetailsData,
                            parentData
                        )}
                        {activeStep === steps.length -1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={activeStep === steps.length -1 ? handleSaveAsset : handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === 2? 'Create' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </MainCard>)}
        </Dialog>
    );
};

AssetCreateForm.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    parentData: PropTypes.object,
    currencies: PropTypes.object,
    industries: PropTypes.object
};
export default AssetCreateForm;
