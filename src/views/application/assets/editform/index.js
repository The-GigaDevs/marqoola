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

const AssetEditForm = ({ open, handleCloseDialog, resetForm, setResetForm, parentData, currencies, industries , subindustries, assetid}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [basicInformationData, setBasicInformationData] = React.useState({});
    const [assetDetailsData, setAssetDetailsData] = React.useState({});
     const [errorIndex, setErrorIndex] = React.useState(null);
    
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
        if (open == true && assetid && assetid.length > 1){
            axios.get('/objects/assets/'+assetid).then(response => {
                var basicinformation = {name: response.data.name, parent: response.data.parentid, organisation: response.data.orgaid, description: response.data.data.description};
                var assetdetails = {directassetvalue: {number:response.data.directassetvalue.number, currency:response.data.directassetvalue.currency}, indirectassetvalue: {number:response.data.indirectassetvalue.number, currency:response.data.indirectassetvalue.currency}};
                setBasicInformationData(basicinformation);
                setAssetDetailsData(assetdetails);
                
            }).catch(error => {
                console.log('Could not load asset:', error)
            });
        
        }
    }, [open]);
    
    
    const handleSaveAsset = async () => {
        
        try {
            
            const response =  await axios.post('/objects/assets/' + assetid, {name: basicInformationData.name,
                indirectassetvalue: {number:parseInt(assetDetailsData.indirectassetvalue.number),currency:assetDetailsData.indirectassetvalue.currency}, 
                directassetvalue: {number:parseInt(assetDetailsData.directassetvalue.number),currency:assetDetailsData.directassetvalue.currency}, 
            parentid: basicInformationData.parent,
            orgaid: basicInformationData.organisation,
            data: {
                description: basicInformationData.description,
                title: basicInformationData.name,
                
            }},{
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  'Content-Type': 'application/json'
                }
              }).then(handleCloseDialog);
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
        <MainCard title="View/Modify Asset">
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
                                        {activeStep === 2? 'Update' : 'Next'}
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

AssetEditForm.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    parentData: PropTypes.object,
    currencies: PropTypes.object,
    industries: PropTypes.object,
    assetid: PropTypes.string,
};
export default AssetEditForm;
